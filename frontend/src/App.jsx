import { useState } from "react";

function App() {
  const [model, setModel] = useState("mistralai/mistral-7b-instruct:free");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const models = [
    "mistralai/mistral-7b-instruct:free",
    "meta-llama/llama-3-8b-instruct:free",
    "google/gemini-pro:free",
    "tngtech/deepseek-r1t2-chimera:free",
  ];

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, message }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">OpenRouter Chat</h1>
      
      <select
        className="border p-2 rounded mb-3"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <textarea
        className="border w-full max-w-lg p-3 rounded mb-3"
        rows="3"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div className="bg-white shadow p-4 mt-4 rounded max-w-lg w-full">
          <p><strong>Model Reply:</strong></p>
          <p className="text-gray-700 whitespace-pre-line">{reply}</p>
        </div>
      )}
    </div>
  );
}

export default App;
