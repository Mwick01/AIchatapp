from flask import Flask, request, jsonify
import requests, os, fitz
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route("/upload", methods=["POST"])
def upload_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    doc = fitz.open(stream=file.read(), filetype="pdf")
    if len(doc) > 100:
        return jsonify({"error": "PDF exceeds 100 pages"}), 400

    text = ""
    for page in doc:
        text += page.get_text("text")

    return jsonify({"text": text[:15000]})  # truncate for safety


@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.json
    question = data.get("question")
    pdf_text = data.get("pdf_text", "")
    role = data.get("role", "General")
    model = data.get("model", "mistralai/mistral-7b-instruct:free")

    # System prompt changes based on whether PDF content is available
    if pdf_text.strip():
        system_prompt = f"You are a {role}. Answer clearly and concisely based on the following PDF content."
        user_message = f"PDF Content:\n{pdf_text}\n\nQuestion: {question}"
    else:
        system_prompt = f"You are a {role}. Provide helpful and accurate answers to general questions."
        user_message = question

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
    reply = response.json()

    answer = reply.get("choices", [{}])[0].get("message", {}).get("content", "No response.")
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
