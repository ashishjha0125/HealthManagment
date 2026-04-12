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
            print(f"❌ CRITICAL ERROR: Missing file '{file}' in the directory.")
            print(f"👉 Current Directory: {os.getcwd()}")
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
        print(f"❌ FAILED TO INITIALIZE AI: {e}")
        sys.exit(1)

# Initialize once when server starts
print(f"🐍 System Check: Running on Python {sys.version.split()[0]}")
print("⏳ Initializing NutriVision AI Brain...")
MODEL, LABELS, NUTRITION_DB = load_resources()
print(f"✅ Server Ready! Loaded {len(LABELS)} food categories.")

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
        
        # Nutrition Lookup
        nutrition = NUTRITION_DB.get(food_name, {
            "calories": 0, "protein": 0, "fat": 0, "carbs": 0, "unit": "unknown"
        })

        return {
            "success": True,
            "prediction": {
                "label": food_name,
                "confidence": round(conf_score, 2)
            },
            "nutrition": nutrition
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# To run this: uvicorn main:app --reload