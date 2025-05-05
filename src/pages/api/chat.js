export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ response: 'Method not allowed' });
    }
  
    const responses = {
      "hello": "Hi there! How can I assist you?",
      "who are you": "I am obut",
      "how are you": "I'm just a bot, but I'm doing great, thanks for asking!",
      "bye": "Goodbye! Have a nice day!",
      "default": "Sorry, I didn't understand that."
    };
  
    const userMessage = req.body.message?.toLowerCase().trim() || "";
  
    if (!userMessage) {
      return res.status(200).json({ response: "Please type a valid message." });
    }
  
    const botResponse = responses[userMessage] || responses["default"];
    console.log(`User: ${userMessage} | Bot: ${botResponse}`);
    return res.status(200).json({ response: botResponse });
  }
  