# live_predict.py

import sys, os
sys.path.append(os.path.abspath("."))

import cv2
import torch
import time
import numpy as np
from PIL import Image
from torchvision import transforms
from model.transformer_model import TransformerClassifier  # pyright: ignore

# ✅ Define emotion classes (must match training)
class_names = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# ✅ Define same transform as training
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((48, 48)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# ✅ Load the trained model
model = TransformerClassifier(input_dim=48*48, num_classes=7)
model.load_state_dict(torch.load("saved_model.pth", map_location=torch.device('cpu')))
model.eval()

# ✅ Start webcam
cap = cv2.VideoCapture(0)
last_time = time.time()

print("🟢 Webcam started. Please face the camera.")
print("🔁 Change the expression of the person...")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    # Display instruction
    cv2.putText(frame, "Change the expression of the person", (20, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

    # Predict every 3 seconds
    if time.time() - last_time >= 3:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        img_pil = Image.fromarray(gray)
        img_tensor = transform(img_pil).view(1, -1)

        with torch.no_grad():
            output = model(img_tensor)
            _, predicted = torch.max(output, 1)
            predicted_label = class_names[predicted.item()]

        print(f"😐 Predicted: {predicted_label}")
        last_time = time.time()

    # Show frame
    cv2.imshow("Emotion Detection", frame)

    # Quit on 'q'
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# ✅ Cleanup
cap.release()
cv2.destroyAllWindows()
