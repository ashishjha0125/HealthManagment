from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
import io
import os
import sys
import time
from dotenv import load_dotenv
from google import genai

# Load environment variables (for Gemini API Key)
load_dotenv()
GEMINI_CLIENT = None
if os.getenv("GEMINI_API_KEY"):
    GEMINI_CLIENT = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Fallback models if primary model is overloaded
GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-flash-latest'
]

app = FastAPI(title="NutriVision AI API")

# Allow your future Frontend (React/Flutter) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. LOAD AI & DATA (The Setup) ---
MODEL_PATH = 'food_analyzer_v1.pth'
CLASSES_PATH = 'food_classes.json'
NUTRITION_DB_PATH = 'nutrition_db.json'

def load_resources():
    # Defensive Check: Ensure all required files exist
    required_files = [MODEL_PATH, CLASSES_PATH, NUTRITION_DB_PATH]
    for file in required_files:
        if not os.path.exists(file):
            print(f"[ERROR] CRITICAL ERROR: Missing file '{file}' in the directory.")
            print(f"[INFO] Current Directory: {os.getcwd()}")
            sys.exit(1) # Stop the server immediately if files are missing

    try:
        # Load labels
        with open(CLASSES_PATH, 'r') as f:
            labels = json.load(f)
        
        # Load Nutrition DB
        with open(NUTRITION_DB_PATH, 'r') as f:
            nutrition_db = json.load(f)
            
        # Load Model Structure
        model = models.resnet50(weights=None)
        num_ftrs = model.fc.in_features
        model.fc = nn.Linear(num_ftrs, len(labels))
        
        # Load weights for CPU
        model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
        model.eval()
        
        return model, labels, nutrition_db
    except Exception as e:
        print(f"[ERROR] FAILED TO INITIALIZE AI: {e}")
        sys.exit(1)

# Initialize once when server starts
print(f"[PYTHON] System Check: Running on Python {sys.version.split()[0]}")
print("[LOADING] Initializing NutriVision AI Brain...")
MODEL, LABELS, NUTRITION_DB = load_resources()
print(f"[READY] Server Ready! Loaded {len(LABELS)} food categories.")

# --- 2. IMAGE TRANSFORMS ---
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# --- 3. THE ENDPOINTS ---

@app.get("/")
def health_check():
    return {
        "status": "Online", 
        "python_version": sys.version.split()[0],
        "model": "ResNet50", 
        "classes_loaded": len(LABELS)
    }

@app.post("/predict")
async def predict_food(file: UploadFile = File(...)):
    """
    Receives an image, identifies the food, and returns nutrition data.
    """
    try:
        # Read the uploaded image bytes
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # AI Inference
        input_tensor = preprocess(img).unsqueeze(0)
        with torch.no_grad():
            output = MODEL(input_tensor)
            probabilities = torch.nn.functional.softmax(output[0], dim=0)
            confidence, index = torch.max(probabilities, 0)
        
        food_name = LABELS[index]
        conf_score = float(confidence.item() * 100)
        
        # --- FALLBACK: If confidence is low, use Gemini AI ---
        # If the local model is less than 60% confident AND Gemini API key is available
        if conf_score < 60.0 and GEMINI_CLIENT:
            try:
                print(f"[INFO] Low confidence ({conf_score:.2f}%). Falling back to Gemini AI...")
                prompt = """
                You are a nutrition analyst. Look at this image. 
                Identify the food item, estimate its visual quantity (e.g., '3 pieces', '1 full bowl', 'approx 200g'), and provide the estimated total nutritional value for THAT specific quantity shown in the image in JSON format.
                Provide only a valid JSON output with the following keys exactly:
                {
                    "food_name": "Name of the food",
                    "estimated_quantity": "Visual estimate of amount",
                    "calories": 0,
                    "protein": 0,
                    "fat": 0,
                    "carbs": 0
                }
                If it's not food, set 'food_name' to "Not recognized as food".
                """
                
                # Try multiple models with retry logic
                gemini_data = None
                last_error = None
                
                for model_name in GEMINI_MODELS:
                    try:
                        print(f"[GEMINI] Attempting with model: {model_name}")
                        for attempt in range(2):  # 2 attempts per model
                            try:
                                response = GEMINI_CLIENT.models.generate_content(
                                    model=model_name,
                                    contents=[prompt, img]
                                )
                                response_text = response.text.strip()
                                
                                # Extract JSON from response if it is wrapped in markdown blocks
                                import re
                                json_match = re.search(r'```(?:json)?(.*?)```', response_text, re.DOTALL)
                                if json_match:
                                    response_text = json_match.group(1).strip()
                                
                                gemini_data = json.loads(response_text)
                                print(f"[SUCCESS] Got response from {model_name}")
                                break  # Success, exit retry loop
                            except Exception as attempt_error:
                                last_error = attempt_error
                                if attempt == 0:  # First attempt failed, wait before retry
                                    print(f"[RETRY] Attempt {attempt + 1} failed, retrying in 2 seconds...")
                                    time.sleep(2)
                                else:
                                    print(f"[FAIL] Model {model_name} failed: {type(attempt_error).__name__}")
                        
                        if gemini_data:
                            break  # Got data from this model, exit model loop
                            
                    except Exception as e:
                        print(f"[ERROR] Model {model_name} error: {e}")
                        last_error = e
                        continue
                
                if gemini_data:
                    return {
                        "success": True,
                        "prediction": {
                            "label": gemini_data.get("food_name", "Unknown Food (Gemini)"),
                            "confidence": 99.0,
                            "source": "Gemini AI"
                        },
                        "nutrition": {
                            "calories": gemini_data.get("calories", 0),
                            "protein": gemini_data.get("protein", 0),
                            "fat": gemini_data.get("fat", 0),
                            "carbs": gemini_data.get("carbs", 0),
                            "unit": gemini_data.get("estimated_quantity", "1 serving estimated")
                        }
                    }
                else:
                    print(f"[WARNING] All Gemini models failed. Last error: {last_error}. Using local model result.")
                    
            except Exception as e:
                print(f"[WARNING] Gemini Fallback Failed: {e}. Returning local model result.")

        # Normal Nutrition Lookup (Local Model)
        nutrition = NUTRITION_DB.get(food_name, {
            "calories": 0, "protein": 0, "fat": 0, "carbs": 0, "unit": "unknown"
        })

        return {
            "success": True,
            "prediction": {
                "label": food_name,
                "confidence": round(conf_score, 2),
                "source": "Local AI Model"
            },
            "nutrition": nutrition
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# To run this: uvicorn main:app --reload
#uvicorn main:app --reload --host 0.0.0.0