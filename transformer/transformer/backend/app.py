import sys
import os
import io
import base64

# Dynamically add "transformer" folder to path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import torch
import torchvision.transforms as transforms
from model.transformer_model import TransformerClassifier

# ✅ FastAPI app
app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Request model
class ImageData(BaseModel):
    image: str  # base64 string

# ✅ Load model
model = TransformerClassifier(input_dim=48*48, num_classes=7)
model.load_state_dict(torch.load(
    os.path.join(BASE_DIR, "saved_model.pth"), map_location="cpu"))
model.eval()

# ✅ Transformations
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((48, 48)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# ✅ Class labels
class_names = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# ✅ Prediction endpoint
@app.post("/predict")
async def predict(data: ImageData):
    image_data = data.image.split(",")[1]
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes)).convert("L")

    tensor = transform(image).view(1, -1)

    with torch.no_grad():
        output = model(tensor)
        _, pred = torch.max(output, 1)

    return {"prediction": class_names[pred.item()]}
