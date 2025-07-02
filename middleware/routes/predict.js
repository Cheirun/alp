const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/predict
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    const response = await axios.post('http://127.0.0.1:8000/predict', { image });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Prediction failed', details: err.message });
  }
});

module.exports = router; 