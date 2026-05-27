const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// FIX: Allow Pendo to fully communicate and send data
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.pendo.io https://data.pendo.io https://app.pendo.io https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://api.groq.com https://cdn.pendo.io https://data.pendo.io https://app.pendo.io; img-src 'self' data: https://cdn.pendo.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
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
