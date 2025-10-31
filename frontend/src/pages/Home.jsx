import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, Languages, Settings } from "lucide-react"; // optional icons

function Home() {
  // Dashboard items — easy to expand later
  const features = [
    {
      name: "OpenRouter Chat",
      path: "/openrouter",
      description: "Chat with AI or upload PDFs for context-aware Q&A.",
      icon: <MessageSquare className="w-10 h-10 mb-3 text-purple-600" />,
    },
    {
      name: "Google Translator",
      path: "/googletranslater",
      description: "Translate text between languages quickly.",
      icon: <Languages className="w-10 h-10 mb-3 text-green-600" />,
    },
    {
      name: "Settings",
      path: "/settings",
      description: "Customize your experience and preferences.",
      icon: <Settings className="w-10 h-10 mb-3 text-gray-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-10">
        🧠 OpenRouter Toolkit Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {features.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center hover:-translate-y-1 border border-gray-100"
          >
            {item.icon}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      <footer className="text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} OpenRouter Toolkit · Built with React + Flask
      </footer>
    </div>
  );
}

export default Home;
