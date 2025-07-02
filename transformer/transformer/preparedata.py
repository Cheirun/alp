import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# 🔹 Load the FER dataset from CSV (make sure 'fer2013.csv' is in the same folder)
df = pd.read_csv("fer2013.csv")

# 🔹 Optional: Emotion mapping (for your own reference, not needed by the model)
emotion_map = {
    0: "angry", 
    1: "disgust", 
    2: "fear", 
    3: "happy", 
    4: "sad", 
    5: "surprise", 
    6: "neutral"
}

# 🔹 Convert each image's pixel string to a numpy array
# Each image is 48x48, so we reshape the flat list into (48, 48), then normalize to [0, 1]
X = np.array([
    np.fromstring(pixels, sep=' ').reshape(48, 48) / 255.0
    for pixels in df['pixels']
])

# 🔹 Flatten each 48x48 image into a 1D vector (shape: 2304,)
# This is needed to feed it into a fully connected layer or transformer input
X = X.reshape(-1, 48 * 48)

# 🔹 Get the emotion labels
y = df['emotion'].values

# 🔹 Split data into 80% training and 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 🔹 Save the arrays as .npy files so you can load them later without reprocessing
np.save("data/X_train.npy", X_train)
np.save("data/X_test.npy", X_test)
np.save("data/y_train.npy", y_train)
np.save("data/y_test.npy", y_test)

# ✅ Now you have 4 files ready for training:
# data/X_train.npy, data/y_train.npy, data/X_test.npy, data/y_test.npy
