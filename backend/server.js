const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("DevMate AI Backend Running 🚀");
});

// 🔥 Analyze Repo (Mock AI)
app.post("/analyze", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    // Validation
    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL is required" });
    }

    const parts = repoUrl.split("/");
    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }

    // GitHub API call
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const data = response.data;

    // 🧠 Mock AI Summary
    const summary = `
${data.name} is a ${data.language} project with ${data.stargazers_count} stars.

It is widely used by developers to build scalable and modern applications.

This repository solves real-world problems by providing reusable components and efficient architecture.

GitHub URL: ${data.html_url}
`;

    // Final response
    res.json({
      repo: data.name,
      aiSummary: summary,
    });
  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Server start
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
