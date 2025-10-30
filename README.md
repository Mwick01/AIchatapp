🧠 OpenRouter Dual-Mode Chatbot (Text + PDF Q&A)

This web application is a full-stack React + Flask web app that allows:
Chat normally with any OpenRouter model, or

Upload a PDF (under 100 pages) and ask questions derived from its content.
you can also select a role (Student, Teacher, Researcher, etc.) to change how answers are phrased.


Project Structure

[folder_name]/
│
├── backend/
│   ├── app.py          ← Flask backend
│   └── .env            ← OpenRouter API key
│
├── frontend/
│   ├── src/
│   │   └── App.jsx     ← Main React interface
│   ├── index.html
│   └── tailwind.config.js


Environment Setup

Backend

Go to the backend directory:
cd backend


Create a virtual environment and install dependencies:

python -m venv venv
venv\Scripts\activate   # (Windows)
pip install flask flask-cors python-dotenv requests pymupdf


Setup .env:
OPENROUTER_API_KEY=your_openrouter_api_key_here


Run Flask:
python app.py

→ Backend runs at http://127.0.0.1:5000

Frontend

Go to frontend directory:
cd frontend


Install dependencies:
npm install


Install and configure Tailwind:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Run the frontend:
npm run dev


API Endpoints
Endpoint	Method	Description
/upload	  POST	  Upload and extract text from PDF (max 100 pages).
/ask	    POST	  Send question + role + (optional PDF text) to OpenRouter and return the model’s response

