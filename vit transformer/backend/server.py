from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # Used for defining the input data structure
from PIL import Image  # For image processing
import io, base64
import torch
from emotion_model import model, extractor  # Import model and extractor from emotion_model.py

# Initialize FastAPI app
app = FastAPI()

# Allow requests from frontend (cross-origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (frontend can be opened from any location)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define structure of incoming JSON (base64 image)
class ImageData(BaseModel):
    image_base64: str  # A string that contains the base64-encoded image from the frontend

# API endpoint to receive base64 image and return emotion
@app.post("/predict-base64")
async def predict_emotion_base64(data: ImageData):
    try:
        # Remove metadata header (e.g., "data:image/png;base64,") and decode
        header, encoded = data.image_base64.split(",", 1)
        image_data = base64.b64decode(encoded)

        # Convert raw bytes into a PIL image
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Extract model input format
        inputs = extractor(images=image, return_tensors="pt")

        # Disable gradient calculation and make prediction
        with torch.no_grad():
            outputs = model(**inputs)

        # Get predicted class index
        predicted_class = torch.argmax(outputs.logits, dim=1).item()

        # Convert class index to emotion label (e.g., happy, sad, etc.)
        predicted_label = model.config.id2label[predicted_class]

        # Return the emotion result to frontend
        return {"emotion": predicted_label}

    except Exception as e:
        # Catch and return error message
        return {"error": f"Failed to predict emotion: {str(e)}"}
