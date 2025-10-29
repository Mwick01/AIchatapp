import { useState } from "react";

function App() {
  const [model, setModel] = useState("nvidia/nemotron-nano-12b-v2-vl:free");
  const [role, setRole] = useState("General");
  const [pdfText, setPdfText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");

  const models = [
   
    "nvidia/nemotron-nano-12b-v2-vl:free",
    "minimax/minimax-m2:free",
    "alibaba/tongyi-deepresearch-30b-a3b:free",
    "meituan/longcat-flash-chat:free",
    "nvidia/nemotron-nano-9b-v2:free",
    "deepseek/deepseek-chat-v3.1:free",
    "openai/gpt-oss-20b:free",
    "z-ai/glm-4.5-air:free",
    "qwen/qwen3-coder:free",
    "moonshotai/kimi-k2:free",
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    "google/gemma-3n-e2b-it:free",
    "tencent/hunyuan-a13b-instruct:free",
    "tngtech/deepseek-r1t2-chimera:free",
    "mistralai/mistral-small-3.2-24b-instruct:free",
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.3-8b-instruct:free",
  ];

  const roles = ["Student", "Teacher", "Researcher", "General"];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.error) alert(data.error);
    else setPdfText(data.text);
  };

  const askQuestion = async () => {
    if (!question.trim()) return alert("Please type a question first!");
    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, pdf_text: pdfText, role, model }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const clearPDF = () => {
    setPdfText("");
    setPdfName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">🧠 Smart Chat / PDF Q&A</h1>

      <div className="flex flex-col gap-3 w-full max-w-2xl">
        <div className="flex gap-3 flex-wrap">
          <select className="border p-2 rounded" value={model} onChange={(e) => setModel(e.target.value)}>
            {models.map((m) => <option key={m}>{m}</option>)}
          </select>

          <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="border p-2 rounded" />
          {pdfName && (
            <button onClick={clearPDF} className="text-sm text-red-600 underline">
              Remove ({pdfName})
            </button>
          )}
        </div>

        <textarea
          rows="3"
          placeholder="Ask your question..."
          className="border p-3 rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Thinking..." : pdfText ? "Ask from PDF" : "Ask (Normal Chat)"}
        </button>

        {answer && (
          <div className="bg-white shadow p-4 mt-4 rounded border border-purple-200">
            <p className="font-semibold text-purple-700">
              Answer ({role} mode {pdfText ? "from PDF" : "general"}):
            </p>
            <p className="text-gray-800 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
