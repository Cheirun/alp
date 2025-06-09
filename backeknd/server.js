const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config(); // Load .env
connectDB();     // Connect to MongoDB

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Routes (you can import and use your routes here)
app.use('/api/emotion', require('./routes/emotionroutes'));
app.use('/api/lessons', require('./routes/lessonroutes'));
app.use('/api/progress', require('./routes/progressroutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

