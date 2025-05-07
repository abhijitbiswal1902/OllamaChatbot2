// Import required libraries
const express = require("express");        // Web framework for Node.js
const cors = require("cors");              // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const bodyParser = require("body-parser"); // Middleware to parse JSON request bodies
const axios = require("axios");            // Library to make HTTP requests
require("dotenv").config();                // Loads environment variables from a .env file into process.env

// Set the Ollama server URL, defaulting to localhost if not provided in .env
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

// Log the Ollama URL to verify it's set correctly
console.log("Requesting Ollama at:", OLLAMA_URL);

// Import and initialize chat routes with the Ollama URL
const chatRoutes = require("./routes/chat")(OLLAMA_URL);

// Create an Express app instance
const app = express();

// Apply middleware
app.use(cors());                // Allow cross-origin requests
app.use(bodyParser.json());     // Parse incoming JSON request bodies

// Register the chat route under /api/chat
app.use("/api/chat", chatRoutes);

// Define a health check endpoint for Ollama server
app.get("/api/ollama-status", async (req, res) => {
  try {
    // Try to get the list of available models from the Ollama server
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);

    // Respond with success if connected
    res.json({ connected: true, message: "Ollama is running", models: response.data.models });
  } catch (error) {
    // If connection fails, respond with error details
    res.status(500).json({
      connected: false,
      message: "Cannot connect to Ollama",
      error: error.message,
    });
  }
});

// Set the port from environment or use default 8555
const PORT = process.env.PORT || 8555;

// Start the server and optionally test the Ollama connection
app.listen(PORT, async () => {
  console.log(` Server running on port ${PORT}`);

  // Optional startup check for Ollama connectivity
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    console.log("Ollama connected. Available models:", response.data.models);
  } catch (error) {
    console.error("Failed to connect to Ollama on startup:", error.message);
  }
});
