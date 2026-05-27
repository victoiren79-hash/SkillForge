const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// FIX: Tell browsers they are allowed to load the Pendo script from cdn.pendo.io
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.pendo.io; connect-src 'self' https://api.groq.com https://cdn.pendo.io https://app.pendo.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;"
    );
    next();
});

// Serve the main HTML file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

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
