// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: String,
    topic: String, // e.g., "math", "science"
    difficulty: { type: String, enum: ["easy", "medium", "hard"] }
});

module.exports = mongoose.model("Question", questionSchema);
