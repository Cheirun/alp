const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  level: Number,
  content: String
});
module.exports = mongoose.model('Lesson', lessonSchema);
