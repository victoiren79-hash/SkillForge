# SkillForge 🎯
### Stop researching. Start learning.

**Live app → [skillforge-cfcn.onrender.com](https://skillforge-cfcn.onrender.com)**

---

## The Problem

You want to learn something new. You open YouTube. You open Reddit. An hour later, you've read about *how to learn* but haven't practiced anything — and the motivation is fading.

Most people don't quit hobbies because they lack discipline. They quit because there's no clear path, and building one from scratch takes time they don't have.

---

## What SkillForge Does

Type in any skill or hobby → get a **gamified, structured roadmap** in seconds.

No account. No setup. No API key. Just type what you want to learn and go.

---

## Features

| Feature | What it does |
|---|---|
| 🤖 AI-generated curriculums | 5–7 sequential phases with tasks, YouTube links, and search queries |
| 🔒 Phase gating | Phases unlock sequentially — fundamentals before flourishes |
| 🎮 Gamified completion | Screen shake + progress animation when you finish a phase |
| 🌊 Spring-physics dot | Buttery-smooth progress indicator built on requestAnimationFrame |
| ⏱️ Time-aware roadmaps | Tell it how many hours/week you have — it adjusts the timeline |
| 🔗 Shareable links | Every roadmap gets a public URL you can send to anyone |
| 💾 Persistent state | LocalStorage saves your roadmap and progress across sessions |
| 📊 Novus.ai analytics | Real user behavior tracking from day one |

---

## Who It's For

The busy adult who knows exactly what hobby they want to learn — guitar, photography, coding, pottery, whatever — but doesn't have time to spend hours researching where to begin.

SkillForge is for the person who just wants to be told: *start here, do this, then this.*

---

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, ES6 JavaScript
- **AI:** Groq API (meta-llama/llama-4-scout-17b-16e-instruct)
- **Backend:** Node.js / Express — secure API proxy, key never exposed to client
- **Hosting:** Render, continuous deployment from GitHub
- **Analytics:** Novus.ai

---

## Key Engineering Decisions

**Spring-physics progress dot**
Standard CSS transitions produced janky stuttering when the UI shifted mid-animation. Replaced with a custom requestAnimationFrame loop with stiffness + damping applied to velocity. The dot glides smoothly regardless of DOM changes beneath it.

**LLM prompt engineering for sequential structure**
LLMs default to vague timeframes ("Ongoing", repeated "Week 1–3"). Enforced strict prompt constraints: each phase must reference the end date of the previous one, adjusted by the user's available hours per week. Forced JSON-only responses to prevent parser-breaking outputs.

**Secure API proxy**
The Groq API key lives exclusively in server-side environment variables and is injected at request time. Users never need to provide or manage an API key — they just use the app.

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/skillforge
cd skillforge
npm install
echo "GROQ_API_KEY=your_key_here" > .env
npm start
```

App runs at `http://localhost:3000`

---

## What's Next

- **Community roadmaps** — publish your roadmap publicly for others to follow
- **Streaks & accountability** — daily practice prompts and completion streaks
- **Embedded resources** — inline YouTube player inside task cards
- **Novus-powered insights** — surface real completion data to adjust timelines

---

*Built for [Mind the Product: World Product Day 2026](https://worldproductday.devpost.com)*
