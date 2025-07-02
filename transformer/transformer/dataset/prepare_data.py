# dataset/prepare_data.py

import os
import shutil
from PIL import Image

# Input directory where raw dataset is located
SOURCE_DIR = "ALPdataset"

# Output directory for processed images
DEST_DIR = "data"

# Desired image size (48x48 for FER dataset)
TARGET_SIZE = (48, 48)

def preprocess_image(source_path, dest_path):
    # Open image and convert to grayscale
    with Image.open(source_path) as img:
        img = img.convert("L")  # grayscale
        img = img.resize(TARGET_SIZE)
        img.save(dest_path)

def process_dataset(split):
    input_split_path = os.path.join(SOURCE_DIR, split)
    output_split_path = os.path.join(DEST_DIR, split)

    # Create output folders
    os.makedirs(output_split_path, exist_ok=True)

    # Loop through each emotion class
    for emotion in os.listdir(input_split_path):
        emotion_path = os.path.join(input_split_path, emotion)
        if not os.path.isdir(emotion_path):
            continue

        output_emotion_path = os.path.join(output_split_path, emotion)
        os.makedirs(output_emotion_path, exist_ok=True)

        # Process each image
        for filename in os.listdir(emotion_path):
            if filename.lower().endswith((".png", ".jpg", ".jpeg")):
                source_file = os.path.join(emotion_path, filename)
                dest_file = os.path.join(output_emotion_path, filename)
                try:
                    preprocess_image(source_file, dest_file)
                except Exception as e:
                    print(f"Error processing {source_file}: {e}")

def main():
    print("📂 Preprocessing dataset...")
    for split in ["train", "test"]:
        process_dataset(split)
    print("✅ Preprocessing complete. Output saved in 'data/' folder.")

if __name__ == "__main__":
    main()
