from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)  # allow React frontend access

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    model = data.get("model")
    message = data.get("message")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": message}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
    reply = response.json()

    # Extract the message safely
    content = reply.get("choices", [{}])[0].get("message", {}).get("content", "No response.")
    return jsonify({"reply": content})

if __name__ == "__main__":
    app.run(debug=True)
