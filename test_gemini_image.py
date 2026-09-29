import os
from dotenv import load_dotenv
from google import genai
from PIL import Image

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

print("[TEST] Testing Gemini with image content...")

try:
    # Create a simple test image
    print("[CREATE] Creating a test image...")
    img = Image.new('RGB', (100, 100), color='red')
    
    print("[CALL] Calling Gemini with image...")
    gemini_response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            "What color is this image? Respond with just one word.",
            img
        ]
    )
    
    print(f"[SUCCESS] Gemini Response: {gemini_response.text}")
    
except Exception as e:
    print(f"[ERROR] {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
