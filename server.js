const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Predefined responses for the bot
const responses = {
  "hello": "Hi there! How can I assist you?",
  "who are you": "I am obut",
  "how are you": "I'm just a bot, but I'm doing great, thanks for asking!",
  "bye": "Goodbye! Have a nice day!",
  "default": "Sorry, I didn't understand that."
};

// Handle the POST request for chat messages
app.post('/chat', (req, res) => {
  const userMessage = req.body.message ? req.body.message.toLowerCase() : ''; // Ensure the message exists
  if (!userMessage.trim()) {
    return res.json({ response: "Please type a valid message." }); // Handle empty or invalid message
  }

  const botResponse = responses[userMessage] || responses["default"]; // Get bot response or default if no match
  console.log(`User: ${userMessage} | Bot: ${botResponse}`); // Log the user message and bot response
  res.json({ response: botResponse }); // Send the response back to the frontend
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
