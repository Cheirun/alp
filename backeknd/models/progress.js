const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  level: Number,
  emotion: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Progress', progressSchema);
