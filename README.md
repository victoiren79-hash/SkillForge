# SkillForge 🎯
### Stop researching. Start learning.

**Live app → [skillforge-cfcn.onrender.com](https://skillforge-cfcn.onrender.com)**

---

## The Problem

You're a busy adult. You want to learn guitar, photography, watercolor, coding — something just for you.

So you open YouTube. You open Reddit. An hour later you've watched three videos about *how to practice*, read two threads about the *best beginner course*, and still haven't touched a guitar. The motivation that was there an hour ago is already fading.

That's not a discipline problem. That's a missing-product problem.

Most learning tools are built for students with unlimited time. SkillForge is built for the person who has 3–5 hours a week, knows exactly what they want to learn, and just needs someone to tell them: *start here, do this, then this.*

---

## What SkillForge Does

SkillForge is an execution system that forces learning completion.

Type any skill → get a structured, gamified, hands-on roadmap in seconds.

Tell it what you want to learn and how many hours a week you have. It generates a 5–7 phase curriculum with specific tasks, real YouTube links, and Google search queries already picked — so you're never more than one click away from actual practice.

Phases unlock only when you complete the previous one. Finish a phase and the AI Skill Coach appears — personalized coaching for your exact milestone, the insight most beginners miss at that step, and a push toward what's next.

No account. No setup. No API key. Just type and go.

---

## Features

| Feature | What it does |
|---|---|
| 🤖 AI-generated roadmaps | 5–7 sequential phases with tasks, YouTube links, and search queries |
| ⏱️ Time-aware scheduling | Tell it your hours/week — it adjusts the entire timeline |
| 🔒 Phase gating | Phases unlock sequentially — fundamentals before flourishes |
| 🧠 AI Skill Coach | After completing a phase, get a personalized coaching message — your milestone, your next move |
| 🎮 Gamified completion | Full-screen unlock animation when you finish a phase |
| 🌊 Spring-physics dot | Buttery-smooth progress indicator built on requestAnimationFrame |
| 🔗 Shareable links | Every roadmap gets a public URL you can send to anyone |
| 💾 Persistent state | LocalStorage saves your progress — close the tab, come back tomorrow |
| 📊 Novus.ai analytics | Real user behavior tracked from day one |
| 📈 Data-driven fixes | UX issues found and fixed using real Novus analytics — not guesses |

---

## Who It's For

The busy adult who knows exactly what hobby they want to learn — guitar, photography, coding, pottery, watercolor, whatever — but doesn't have time to spend hours researching where to start.

Not students. Not professionals doing career training. The person learning something purely because they want to — and keeps quitting in the first week because the starting line is invisible.

SkillForge makes the starting line obvious.

---

## How It Works

1. Type your skill — *"learn fingerpicking guitar"*, *"start watercolor painting"*, *"get into film photography"*
2. Enter your weekly hours — SkillForge adjusts the timeline to your real life
3. Get your roadmap — 5–7 phases, each with specific tasks and resources
4. Work through it — phases unlock as you complete them
5. Finish a phase — the AI Coach celebrates your milestone and prepares you for what's next

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, ES6 JavaScript |
| AI | Groq API — Llama 4 Scout |
| Backend | Node.js / Express — secure API proxy |
| Storage | Supabase (shared roadmaps) + LocalStorage (progress) |
| Hosting | Render — continuous deployment from GitHub |
| Analytics | Novus.ai |

No frameworks. No build tools. No dependencies beyond Express.

---

## Key Engineering Decisions

**Time-aware roadmap generation**
The hours/week input isn't cosmetic — it rewrites the entire prompt. 2 hours/week produces a 24-week plan. 10 hours/week produces an 8-week plan. Same skill, completely different path. This is the core product insight: a roadmap that ignores your schedule isn't a roadmap, it's a wish list.

**Non-blocking AI Coach**
The coach fires after phase completion but is fully decoupled from the completion logic. Task marked done instantly. Phase unlocks instantly. Coach appears 1.2 seconds later as a non-blocking overlay. If the API fails or times out, a fallback message appears. The user is never waiting.

**Spring-physics progress dot**
Standard CSS transitions stuttered when the UI shifted mid-animation. Replaced with a custom requestAnimationFrame loop with stiffness and damping applied to velocity. The dot glides smoothly regardless of DOM changes beneath it — a detail users don't consciously notice but feel.

**Sequential prompt engineering**
LLMs default to vague timeframes like "Ongoing" or repeat "Week 1–3" across every phase. Enforced strict constraints: each phase must start exactly where the previous one ended, scaled by the user's available hours. Forced JSON-only output to prevent parser failures.

**Secure API proxy**
The Groq API key lives exclusively in server-side environment variables. Users never provide or manage a key — they just use the app.

---

## Built on Real User Data

Installing analytics was step one. Using it was the work.

Once Novus.ai was correctly wired up, the data surfaced two real problems:

**44% of visitors never submitted a skill.** Session data showed dead clicks on the input fields — no labels, and parts of the input box weren't clickable. Fixed by adding visible labels and making the entire input area respond to clicks.

**Completed tasks were generating rage clicks.** Users repeatedly clicked "Complete" on tasks already marked done — 5 frustration events in 5 seconds. Fixed by disabling the button and auto-collapsing the card 800ms after completion.

Every product decision after week one came from watching what real users did — not from guessing what they might want.

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/skillforge
cd skillforge
npm install
cp .env.example .env
# Add your GROQ_API_KEY, SUPABASE_URL, and SUPABASE_KEY to .env
npm start
```

App runs at `http://localhost:3000`

---

## What's Next

- **Community roadmaps** — publish your path publicly for others to follow
- **Streaks and accountability** — daily practice prompts and completion streaks
- **Novus-powered timeline suggestions** — surface real completion data to adjust schedules based on how actual users progress, not guesses
- **Embedded resources** — inline YouTube player inside task cards, zero context switching

---

*Built for [Mind the Product: World Product Day 2026](https://mindtheproduct.devpost.com)*
