# train.py

import os
import sys
sys.path.append(os.path.abspath("."))

import torch
import torch.nn as nn
import torch.optim as optim
from model.transformer_model import TransformerClassifier
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

print("✅ Starting training script...")

# ✅ Load datasets directly here
def get_data_loaders(train_dir, test_dir, batch_size=32, image_size=48):
    transform = transforms.Compose([
        transforms.Grayscale(),
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    train_dataset = datasets.ImageFolder(root=train_dir, transform=transform)
    test_dataset = datasets.ImageFolder(root=test_dir, transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, test_loader, train_dataset.classes

# ✅ Step 1: Set device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# ✅ Step 2: Load datasets
train_loader, test_loader, class_names = get_data_loaders(
    train_dir="data/train",
    test_dir="data/test",
    batch_size=32,
    image_size=48
)

# ✅ Step 3: Initialize Transformer model
model = TransformerClassifier(input_dim=48*48, num_classes=7)  # ✅ 7 emotions
model.to(device)

# ✅ Step 4: Define loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# ✅ Step 5: Training loop
num_epochs = 10
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:
        images = images.view(images.size(0), -1).to(device)  # Flatten images
        labels = labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    train_acc = 100 * correct / total
    print(f"Epoch {epoch+1}/{num_epochs} | Loss: {running_loss:.4f} | Train Accuracy: {train_acc:.2f}%")

# ✅ Step 6: Evaluate on Test Set
model.eval()
correct = 0
total = 0

with torch.no_grad():
    for images, labels in test_loader:
        images = images.view(images.size(0), -1).to(device)
        labels = labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

test_acc = 100 * correct / total
print(f"\n🎯 Final Test Accuracy: {test_acc:.2f}%")

# ✅ Step 7: Save the trained model
torch.save(model.state_dict(), "saved_model.pth")
print("✅ Model saved as saved_model.pth")
