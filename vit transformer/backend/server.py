# server.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io
import base64
import torch
from emotion_model import model, extractor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image_base64: str

@app.post("/predict-base64")
async def predict_emotion_base64(data: ImageData):
    try:
        header, encoded = data.image_base64.split(",", 1)
        image_data = base64.b64decode(encoded)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        inputs = extractor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)

        predicted_class = torch.argmax(outputs.logits, dim=1).item()
        predicted_label = model.config.id2label[predicted_class]

        return {"emotion": predicted_label}
    except Exception as e:
        return {"error": f"Failed to predict emotion: {str(e)}"}
