const router = require('express').Router();
const Progress = require('../models/Progress');

router.post('/', async (req, res) => {
  const progress = new Progress(req.body);
  await progress.save();
  res.json(progress);
});

router.get('/', async (req, res) => {
  const data = await Progress.find();
  res.json(data);
});

module.exports = router;