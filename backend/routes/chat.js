// Import the Express library to create routes
const express = require("express");

// Import sqlite3 and enable verbose mode for detailed error reporting
const sqlite3 = require("sqlite3").verbose();
//Verbose mode on a Mac displays detailed text messages during the startup process, offering insights into what's happening as the operating system loads.

// Import the askLlama2 function from the service handling communication with LLaMA2
const { askLlama2 } = require("../services/ollamaService");

// Export a function that takes the Ollama server URL and returns an Express router
module.exports = function (OLLAMA_URL) {
  // Create a new router instance
  const router = express.Router();

  // Open a connection to the SQLite database located at ./db/university.db
  const db = new sqlite3.Database("./db/university.db");

  // Define a POST route at the root path
  router.post("/", async (req, res) => {
    // Get the message from the user's request body
    const userMessage = req.body.message;

    // Log the user's message for debugging
    console.log(userMessage);

    // If no message was provided, return a 400 Bad Request error
    if (!userMessage) {
      return res.status(400).json({ error: "Message required" });
    }

    // Construct the prompt to send to LLaMA2, asking for a valid SQL query only
    const prompt = `
You are a helpful assistant. Generate a valid SQLite query for the user request:
dont use "M" when asking regarding the gender .Give the query using "MALE"
"${userMessage}"

Return only the SQL code.
`;

    try {
      // Ask LLaMA2 to generate an SQL query based on the prompt
      const sqlQuery = await askLlama2(prompt, OLLAMA_URL);

      // Log the generated SQL query for debugging
      console.log("Generated SQL Query:", sqlQuery);

      // Check if the response is valid and doesn't contain an error
      if (!sqlQuery || sqlQuery.toLowerCase().includes("error")) {
        return res.status(400).json({ error: "Invalid SQL query returned by LLaMA2" });
      }

      // Execute the SQL query on the database using db.all for SELECT-like queries
      db.all(sqlQuery, [], (err, rows) => {
        // If a database error occurs, log and return it
        if (err) {
          console.error("Database error:", err.message); // Log the error
          return res.status(400).json({ error: err.message, query: sqlQuery });
        }

        // Send back the result of the query along with the original SQL
        res.json({ query: sqlQuery, data: rows });
      });
    } catch (error) {
      // If calling LLaMA2 fails, log the error and return a 500 Internal Server Error
      console.error("Error calling LLaMA 2:", error.message); // Log the error
      res.status(500).json({ error: "Error calling LLaMA 2", detail: error.message });
    }
  });

  // Return the configured router to be used in the main app
  return router;
};
