import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const analyzeRepo = async () => {
    try {
      setLoading(true);
      setResult("");

      const res = await axios.post("http://localhost:8000/analyze", {
        repoUrl: url,
      });

      setResult(res.data.aiSummary);
    } catch (error) {
      setResult("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">

        <div className="relative bg-white dark:bg-gray-900 dark:text-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transition-all">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 text-sm px-3 py-1 border rounded"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <h1 className="text-3xl font-bold text-center mb-6">
            🚀 DevMate AI
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Analyze any GitHub repository in seconds
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste GitHub repo URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black 
              bg-white text-black dark:bg-gray-800 dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-500"
            />

            <button
              onClick={analyzeRepo}
              className="bg-black text-white px-5 py-2 rounded-lg hover:scale-105 transition"
            >
              Analyze
            </button>
          </div>

          {loading && (
            <div className="mt-4 text-center text-gray-500 animate-pulse">
              Analyzing... ⏳
            </div>
          )}

          {result && (
            <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border shadow-sm relative">

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-3 right-3 text-sm bg-black text-white px-3 py-1 rounded"
              >
                Copy
              </button>

              <h2 className="font-semibold mb-2 text-lg">
                AI Summary
              </h2>

              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {result}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
