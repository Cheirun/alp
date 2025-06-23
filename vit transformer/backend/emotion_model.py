# Import necessary libraries from Hugging Face and PyTorch
from transformers import AutoFeatureExtractor, AutoModelForImageClassification
import torch

# Define the model name (from Hugging Face hub)
model_name = "trpakov/vit-face-expression"

# Load the feature extractor to convert images into model-ready tensors
extractor = AutoFeatureExtractor.from_pretrained(model_name)

# Load the pre-trained Vision Transformer (ViT) model for facial expression recognition
model = AutoModelForImageClassification.from_pretrained(model_name)
