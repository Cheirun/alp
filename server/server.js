const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple emotion detection based on landmarks
app.post('/predict', (req, res) => {
  const landmarks = req.body.landmarks;

  if (!landmarks || !Array.isArray(landmarks)) {
    return res.status(400).json({ error: "Landmarks missing or invalid." });
  }

  let emotion = "neutral";

  const topLipY = landmarks[13]?.y;
  const bottomLipY = landmarks[14]?.y;
  const mouthOpen = bottomLipY - topLipY;

  if (mouthOpen > 0.05) {
    emotion = "surprised";
  } else if (landmarks[54]?.x - landmarks[284]?.x > 0.25) {
    emotion = "happy";
  } else if (landmarks[94]?.y - landmarks[374]?.y > 0.05) {
    emotion = "sad";
  }

  res.json({ emotion });
});

// Start the server
app.listen(8000, () => {
  console.log("🚀 Server is running on http://localhost:8000");
});
