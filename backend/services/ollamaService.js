// Import the axios library to make HTTP requests
const axios = require("axios");

// Function to extract only the SQL part from the LLaMA2 model's response
function extractSQL(text) {
  // Try to find SQL inside a markdown-style code block (e.g., ```sql ... ```)
  const codeBlock = text.match(/```(?:sql)?\s*([\s\S]*?)\s*```/i);

  // Try to find an inline SQL query starting with common SQL keywords
  const inlineSQL = text.match(/(SELECT|INSERT|UPDATE|DELETE)[\s\S]+?;/i);

  // If a code block match is found, return the trimmed SQL inside it
  if (codeBlock) return codeBlock[1].trim();

  // If an inline SQL match is found, return the trimmed SQL
  if (inlineSQL) return inlineSQL[0].trim();

  // Return null if no SQL was found
  return null;
}

// Function to check if the Ollama server is reachable
async function isOllamaConnected(OLLAMA_URL) {
  try {
    // Make a GET request to /api/tags endpoint to check connectivity
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);

    // Return true if server responded with status 200 (OK)
    return response.status === 200;
  } catch (error) {
    // Log error if Ollama is not reachable
    console.error("Ollama is not reachable:", error.message);

    // Return false indicating connection failed
    return false;
  }
}

// Function to send a prompt to LLaMA2 and get the SQL query in response
async function askLlama2(prompt, OLLAMA_URL) {
  // Check if the Ollama server is running and reachable
  const connected = await isOllamaConnected(OLLAMA_URL);

  // If not connected, throw an error and stop execution
  if (!connected) {
    throw new Error("Ollama is not running or unreachable.");
  }

  try {
    // Send a POST request to the generate API with the model and prompt
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: "phi",   // Specify the model name
      prompt,            // Include the user's prompt
      stream: false,     // Set stream to false to get full response at once
    });

    // Extract and trim the full text response from LLaMA2
    const fullResponse = response.data.response.trim();

    // Attempt to extract an SQL query from the response text
    const sql = extractSQL(fullResponse);

    // If no SQL is found, throw an error
    if (!sql) {
      throw new Error("No valid SQL query found in LLaMA2 response.");
    }

    // Return the extracted SQL query
    return sql;
  } catch (error) {
    // Log error if communication with LLaMA2 failed
    console.error("Error communicating with LLaMA2:", error.message);

    // Re-throw the error to be handled upstream
    throw error;
  }
}

// Export the askLlama2 function to be used in other files
module.exports = { askLlama2 };
