// Import required dependencies
import React, { useState } from "react";     // React and useState for state management
import axios from "axios";                  // Axios for making HTTP requests
import Message from "./Message";            // Custom component to display the response
import "./ChatBox.css";                     // CSS styles for the chat UI

function ChatBox() {
  // State to hold user input from the textarea
  const [input, setInput] = useState("");

  // State to hold the response from the backend
  const [response, setResponse] = useState(null);

  // State to indicate whether the request is in progress
  const [loading, setLoading] = useState(false);

  // Function to handle sending the message to the backend
  const handleSend = async () => {
    // Do nothing if the input is empty or only whitespace
    if (!input.trim()) return;

    // Set loading state to true while waiting for a response
    setLoading(true);

    try {
      // Make a POST request to the backend chat API with the user's message
      const res = await axios.post("http://localhost:8555/api/chat", {
        message: input, // Send the input as the message in request body
      });

      // Update the response state with the data returned from the backend
      setResponse(res.data);
    } catch (error) {
      // Handle any errors during the request
      setResponse({ error: "Failed to get response" });
    } finally {
      // End loading state regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="chat-container"> {/* Main chat box container */}
      <h2>NLP Chatbot 002</h2> {/* Heading */}

      {/* Textarea for user input */}
      <textarea
        value={input}                              // Bind input value to state
        onChange={(e) => setInput(e.target.value)} // Update state on user input
        placeholder="Ask me about students, instructors, or courses..."
        rows={4}                                   // Set number of rows for height
      />

      {/* Send button, disabled while loading */}
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}  {/* Change button text while loading */}
      </button>

      {/* Show response only if it's available */}
      {response && <Message response={response} />}
    </div>
  );
}

export default ChatBox;
