# 🧠 Ollama Chatbot

A conversational chatbot built using **Node.js**, **React.js**, **SQLite**, and **Ollama LLM**. 
This project allows students to interact with a chatbot trained on university-related data (e.g., student records, departments, results).
User can provide the input(prompt) in natural language and receive the output in natural language as well.
Some sample prompts:List all the students,List all the MALE students,List all the instructors in the database.


---

## 📋 Features

- Chat interface with natural language interaction  
- Uses LLM (Ollama) for intelligent responses functional with multiple models such as phi,phi2,mistral etc. 
- Connected to a SQLite database with normalized university data  
- RESTful API backend using Node.js  
- React frontend with clean UI

---

## ⚙️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js (Express)  
- **Database**: SQLite  
- **AI/LLM**: Ollama (e.g., LLaMA 2,Phi2)  
- **API Testing**: Postman / Thunder Client  

---

## ✅ Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)
- [SQLite](https://www.sqlite.org/index.html)
- [Ollama](https://ollama.com/) installed locally
- Git (for cloning the repo)
- Any LLM model (preffered phi2)

NOTE:If working on any environment apart from Macos please verify the .env file and add neccessary IPV4 port.

---

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/abhijitbiswal1902/OllamaChatbot2
cd ollama-chatbot

2. Set Up the Backend
bash
Copy
Edit
cd backend
npm install

3. Set Up the Frontend
bash
Copy
Edit
cd ../frontend
npm install

4. Start the Ollama Model
bash
Copy
Edit
ollama run llama2 or ollama run phi2

5. Start the Backend Server
bash
Copy
Edit
cd ../backend
npm run dev


6. Start the Frontend React App
bash
Copy
Edit
cd ../frontend
npm start

7. Access the App
Open your browser and go to:
http://localhost:3000

