const express = require("express");
const router = express.Router();
const QuestionLog = require("../models/QuestionLog");
const Question = require("../models/Question");

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const logs = await QuestionLog.find({ userId }).populate("questionId");

        const total = logs.length;
        const correct = logs.filter(log => log.isCorrect).length;
        const emotions = {};

        logs.forEach(log => {
            const emo = log.emotionDetected;
            emotions[emo] = (emotions[emo] || 0) + 1;
        });

        res.json({
            totalAttempts: total,
            correctAnswers: correct,
            accuracy: total ? ((correct / total) * 100).toFixed(2) : 0,
            emotionCounts: emotions,
            logs
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
