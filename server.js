const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files from the current directory (fixes Pendo script loading)
app.use(express.static(__dirname));

// The secure API proxy
app.post('/api/generate', async (req, res) => {
    const key = process.env.GROQ_API_KEY;
    if (!key) return res.status(500).json({ error: "API key missing on server" });

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });
        res.json(await response.json());
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
