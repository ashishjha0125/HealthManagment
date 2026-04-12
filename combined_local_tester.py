import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
import os

# --- CONFIGURATION ---
MODEL_PATH = 'food_analyzer_v1.pth'
CLASSES_PATH = 'food_classes.json'
NUTRITION_DB_PATH = 'nutrition_db.json'
IMAGE_TO_TEST = 'xyz.jpg' # Change this if you want to test a different photo

def load_resources():
    # 1. Load Labels
    with open(CLASSES_PATH, 'r') as f:
        labels = json.load(f)
    
    # 2. Load Nutrition DB
    with open(NUTRITION_DB_PATH, 'r') as f:
        nutrition_db = json.load(f)
        
    # 3. Load Model Structure
    model = models.resnet50(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(labels))
    
    # Load the weights
    model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
    model.eval()
    
    return model, labels, nutrition_db

def run_full_analysis(image_path):
    print(f"🚀 Loading AI Brain and Nutrition Database...")
    model, labels, nutrition_db = load_resources()
    
    # Preprocessing (Standardizing the image)
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    # Prediction logic
    img = Image.open(image_path).convert('RGB')
    input_tensor = preprocess(img).unsqueeze(0)
    
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        confidence, index = torch.max(probabilities, 0)
    
    predicted_label = labels[index]
    conf_score = confidence.item() * 100
    
    print(f"\n✅ AI IDENTIFIED: {predicted_label} ({conf_score:.2f}% Confidence)")
    
    # Nutrition Lookup in your NEW local file
    if predicted_label in nutrition_db:
        nutri = nutrition_db[predicted_label]
        print(f"--- 🍎 NUTRITIONAL INSIGHTS ---")
        print(f"Calories: {nutri['calories']} kcal")
        print(f"Protein:  {nutri['protein']}g")
        print(f"Fat:      {nutri['fat']}g")
        print(f"Carbs:    {nutri['carbs']}g")
        print(f"Serving:  {nutri['unit']}")
    else:
        print(f"⚠️ Nutrition data for '{predicted_label}' not found in local database.")

if __name__ == "__main__":
    if os.path.exists(IMAGE_TO_TEST):
        run_full_analysis(IMAGE_TO_TEST)
    else:
        print(f"❌ Could not find {IMAGE_TO_TEST}. Please ensure your image is in the folder!")