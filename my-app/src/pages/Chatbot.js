import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const API_KEY = "AIzaSyBs_5QrQ-Pz42XnoH9jrIimODxXLEIAn5w";
const CX = "369adc642ad104bb4";

const Chatbot = ({ products }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
  
    let responseText = "I'm not sure, let me check...";
  
    // Check if the message is about a product
    const product = products.find(p => 
      p.name && input.toLowerCase().includes(p.name.toLowerCase()) // ✅ Fix: Check if p.name exists
    );
  
    if (product) {
      responseText = `
        <strong>${product.name}</strong><br/>
        💰 Price: ₹${product.price}<br/>
        🔹 Brand: ${product.brand}<br/>
        🛒 <a href="/product/${product.id}" target="_blank">View Product</a>
      `;
    } else {
      // Fetch Google Search results
      try {
        const res = await axios.get(
          `https://www.googleapis.com/customsearch/v1?q=${input}&key=${API_KEY}&cx=${CX}`
        );
        responseText = res.data.items?.[0]?.snippet || "Sorry, no relevant info found.";
      } catch (error) {
        responseText = "Error fetching details, please try again.";
      }
    }
  
    setMessages([...newMessages, { text: responseText, sender: "bot" }]);
    setInput("");
  };
  

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={`https://media.gettyimages.com/id/1492548051/vector/chatbot-logo-icon.jpg?s=1024x1024&w=gi&k=20&c=EFTZRA9aX0wTURwq_eYzVVsSTJVB4KvcpOJVeDKc0hc=`} alt="Chatbot" />
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h5>eMart Chatbot</h5>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
