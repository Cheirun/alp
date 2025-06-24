const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error: ", err));

// Routes
app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const questionRoutes = require("./routes/question");
app.use("/api/questions", questionRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const questionLogRoutes = require('./routes/questionLog');
app.use('/api/question-log', questionLogRoutes);

const progressRoutes = require("./routes/progress");
app.use("/api/progress", progressRoutes);

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
