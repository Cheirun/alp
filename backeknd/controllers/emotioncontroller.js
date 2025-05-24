const axios = require('axios');

exports.detectEmotion = async (req, res) => {
  try {
    const imageBase64 = req.body.image;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
      { inputs: imageBase64 },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    res.json({ emotion: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Emotion detection failed' });
  }
};
