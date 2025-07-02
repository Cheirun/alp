# dataset/image_dataset_loader.py
import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

def get_data_loaders(train_dir, test_dir, batch_size=32, image_size=48):
    # Define transforms
    transform = transforms.Compose([
        transforms.Grayscale(),  # convert to 1 channel
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),  # convert image to tensor
        transforms.Normalize((0.5,), (0.5,))  # normalize to [-1, 1]
    ])

    # Load datasets
    train_dataset = datasets.ImageFolder(root=train_dir, transform=transform)
    test_dataset = datasets.ImageFolder(root=test_dir, transform=transform)

    # DataLoaders
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, test_loader, train_dataset.classes
