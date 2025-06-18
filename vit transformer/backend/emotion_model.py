# emotion_model.py
from transformers import AutoFeatureExtractor, AutoModelForImageClassification
import torch

model_name = "trpakov/vit-face-expression"
extractor = AutoFeatureExtractor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)
