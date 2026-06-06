const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

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

// ─── Supabase helpers (native fetch, no extra packages) ───

const supabaseHeaders = () => ({
    "apikey": process.env.SUPABASE_KEY,
    "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
});

// POST /api/share — save a roadmap {id, hobby_name, data} to Supabase
app.post('/api/share', async (req, res) => {
    const { id, hobby_name, data } = req.body;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) return res.status(500).json({ error: "Supabase env vars missing" });
    if (!id || !hobby_name || !data) return res.status(400).json({ error: "id, hobby_name, and data are required" });

    try {
        const response = await fetch(`${url}/rest/v1/roadmaps`, {
            method: "POST",
            headers: supabaseHeaders(),
            body: JSON.stringify({ id, hobby_name, data })
        });

        if (!response.ok) {
            const errBody = await response.json();
            // Duplicate id (23505) → 409 Conflict
            if (errBody.code === "23505") return res.status(409).json({ error: "ID already exists" });
            return res.status(response.status).json(errBody);
        }

        const result = await response.json();
        res.status(201).json(result[0] || { id });
    } catch (e) {
        res.status(500).json({ error: "Failed to save roadmap" });
    }
});

// GET /api/share/:id — fetch a roadmap by id from Supabase
app.get('/api/share/:id', async (req, res) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) return res.status(500).json({ error: "Supabase env vars missing" });

    try {
        const response = await fetch(
            `${url}/rest/v1/roadmaps?id=eq.${req.params.id}&select=id,hobby_name,data,created_at`,
            { headers: supabaseHeaders() }
        );

        if (!response.ok) {
            const errBody = await response.json();
            return res.status(response.status).json(errBody);
        }

        const rows = await response.json();
        if (rows.length === 0) return res.status(404).json({ error: "Roadmap not found" });

        res.json(rows[0]);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch roadmap" });
    }
});

// GET /r/:id — serve index.html so shared links work when opened directly
app.get('/r/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
