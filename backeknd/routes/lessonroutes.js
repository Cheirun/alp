const router = require('express').Router();
const Lesson = require('../models/Lesson');

router.post('/', async (req, res) => {
  const lesson = new Lesson(req.body);
  await lesson.save();
  res.json(lesson);
});

router.get('/', async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

module.exports = router;
