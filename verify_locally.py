import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
import matplotlib.pyplot as plt
import os

# --- STEP 1: LOAD THE DICTIONARY ---
def load_labels(json_path):
    try:
        with open(json_path, 'r') as f:
            labels = json.load(f)
            return labels
    except Exception as e:
        print(f"❌ Error loading labels: {e}")
        return None

# --- STEP 2: RECONSTRUCT THE BRAIN ---
def load_trained_model(model_path, num_classes):
    try:
        model = models.resnet50(weights=None)
        num_ftrs = model.fc.in_features
        model.fc = nn.Linear(num_ftrs, num_classes)
        
        device = torch.device('cpu')
        model.load_state_dict(torch.load(model_path, map_location=device))
        model.eval() 
        return model
    except Exception as e:
        print(f"❌ Error loading model weights: {e}")
        return None

# --- STEP 3: PREPARE THE IMAGE ---
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def test_on_my_food(image_path, model_path, json_path):
    labels = load_labels(json_path)
    if labels is None: return
    
    model = load_trained_model(model_path, len(labels))
    if model is None: return
    
    try:
        img = Image.open(image_path).convert('RGB')
    except Exception as e:
        print(f"❌ Error: Cannot open '{image_path}': {e}")
        return

    input_tensor = preprocess(img).unsqueeze(0)
    
    # Predict
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        
        # Get Top 5 results
        top5_prob, top5_idx = torch.topk(probabilities, 5)
    
    # Primary Result
    primary_name = labels[top5_idx[0]]
    primary_conf = top5_prob[0].item() * 100
    
    # --- LEARNING UPDATE: DETECTING "UNKNOWN" CATEGORIES ---
    print(f"\n--- 🔍 Detailed Analysis for {image_path} ---")
    
    # If confidence is extremely low (e.g. < 25%), it's likely the food isn't in our 101 classes
    if primary_conf < 25:
        print("🚩 ALERT: Extremely low confidence detected.")
        print("👉 Reasoning: This image likely contains food NOT present in the 101 categories.")
        print("👉 AI is being forced to pick the 'closest' visual match.")
    
    for i in range(5):
        name = labels[top5_idx[i]]
        conf = top5_prob[i].item() * 100
        print(f"{i+1}. {name:20} | Confidence: {conf:.2f}%")

    # Display Result
    plt.figure(figsize=(10, 7))
    plt.imshow(img)
    
    status_color = 'green' if primary_conf > 50 else 'red'
    title_text = f"Top Guess: {primary_name} ({primary_conf:.2f}%)\n"
    
    if primary_conf < 50:
        if primary_conf < 25:
            title_text += "(⛔ CATEGORY LIKELY NOT SUPPORTED)"
        else:
            title_text += "(⚠️ Low Confidence - Model is confused)"
        
    plt.title(title_text, fontsize=14, color=status_color)
    plt.axis('off')
    plt.show()

# --- NEW FEATURE: CATEGORY EXPLORER ---
def explore_categories(json_path, search_query=None):
    labels = load_labels(json_path)
    if not labels: return
    
    print("\n--- 🧭 Category Explorer ---")
    if search_query and search_query.strip() != "":
        matches = [s for s in labels if search_query.lower() in s.lower()]
        if matches:
            print(f"Found {len(matches)} categories matching '{search_query}':")
            for m in matches: print(f" - {m}")
        else:
            print(f"❌ No category matching '{search_query}' found in the 101 classes.")
            print("Try searching for broader terms like 'cake', 'soup', 'salad', or 'pizza'.")
    else:
        print(f"✅ Listing all {len(labels)} supported categories:")
        # Print in 3 columns for better visibility
        for i in range(0, len(labels), 3):
            row = labels[i:i+3]
            print("{:<25} {:<25} {:<25}".format(*row) if len(row) == 3 else row)

# --- RUN THE TEST ---
if __name__ == "__main__":
    # --- 🛠️ CONFIGURATION ---
    
    # 1. Set EXPLORE_MODE to True if you want to see/search categories.
    # 2. Set EXPLORE_MODE to False to test an actual image.
    EXPLORE_MODE = False   

    # If exploring, enter a keyword (leave empty "" to see ALL categories)
    SEARCH_KEYWORD = "" 
    
    # Path to your test image
    IMAGE_FILE = 'xyz.jpg' 

    if EXPLORE_MODE:
        explore_categories('food_classes.json', SEARCH_KEYWORD)
    else:
        if os.path.exists(IMAGE_FILE):
            test_on_my_food(IMAGE_FILE, 'food_analyzer_v1.pth', 'food_classes.json')
        else:
            print(f"❌ Error: Could not find {IMAGE_FILE} in the folder.")