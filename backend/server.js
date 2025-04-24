const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://comfy-toffee-64b01c.netlify.app", // your Netlify site
  methods: "GET,POST",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const feedbackFilePath = path.join(__dirname, 'feedbacks.json');

// Helper: Load feedbacks
const loadFeedbacks = () => {
  if (!fs.existsSync(feedbackFilePath)) return [];
  return JSON.parse(fs.readFileSync(feedbackFilePath));
};

// Helper: Save feedbacks
const saveFeedbacks = (data) => {
  fs.writeFileSync(feedbackFilePath, JSON.stringify(data, null, 2));
};

// Route: Submit feedback
app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  const feedbacks = loadFeedbacks();
  const newFeedback = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };

  feedbacks.push(newFeedback);
  saveFeedbacks(feedbacks);

  res.status(200).json({ success: true });
});

// Route: Get all feedbacks
app.get('/feedbacks', (req, res) => {
  const feedbacks = loadFeedbacks();
  res.status(200).json(feedbacks);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
