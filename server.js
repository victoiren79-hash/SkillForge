const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/generate', async (req, res) => {
    const key = process.env.GROQ_API_KEY;
    if (!key) return res.status(500).json({ error: "Key missing" });

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });
        res.json(await response.json());
    } catch (e) {
        res.status(500).json({ error: "API fetch failed" });
    }
});

app.listen(3000, () => console.log('Running on port 3000'));
