'use client';
import React, { useState } from "react"; // Ensure React and useState are imported

export default function Home() {
  type ChatMessage = {
    sender: string;
    message: string;
  };

  // Use the useState hook
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  // Function to handle input change
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  // Function to send message to backend and update chat log
  const sendMessage = () => {
    if (userMessage.trim() === "") return;

    // Display user message first
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { sender: "You", message: userMessage },
    ]);

    // Send message to backend
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display bot response
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { sender: "Bot", message: data.response },
        ]);
      });

    setUserMessage(""); // Clear input field
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#a96c6c60]">
      <div className="bg-[#97c4d369] rounded-lg shadow-lg p-4 w-full max-w-md">
        <div
          id="chat-box"
          className="h-96 overflow-y-scroll mb-4 p-3 bg-gray-50 border border-[#8c75f1] rounded-lg"
        >
          {chatLog.map((chat, index) => (
            <div
              key={index}
              className={`${
                chat.sender === "You" ? "text-left" : "text-right"
              } mb-2`}
            >
              <strong>{chat.sender}:</strong> {chat.message}
            </div>
          ))}
        </div>
        <div id="input-area" className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="w-4/5 p-2 border border-[#622849] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            className="w-1/5 bg-green-500 text-black border-[#0c23cc] rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
