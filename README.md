# ⚡ SkillForge

> *Level up your hobbies.*

SkillForge is an AI-powered, gamified learning roadmap generator. Enter any skill or hobby, and it instantly generates a structured, zig-zag timeline of phases and hands-on tasks to take you from zero to proficient. Track your progress with satisfying visual feedback, unlock phases sequentially, and watch your journey unfold.

---

## 💡 Inspiration

The hardest part of learning something new isn't the practice—it's figuring out *what* to practice. The internet is an ocean of fragmented tutorials, but it severely lacks structured, actionable paths. SkillForge was built to eliminate "blank canvas paralysis." Instead of endlessly researching curriculums, just tell SkillForge what you want to master, and it maps out the exact steps, complete with YouTube links, search queries, and practice resources.

---

## ✨ Key Features

- **🤖 AI-Generated Roadmaps:** Leverages Groq's ultra-fast LLMs to output structured, sequential learning phases (5-7 phases per skill).
- **🛤️ Zig-Zag Timeline UI:** A visually distinct, alternating card layout that makes long roadmaps engaging and easy to digest.
- **🟢 Spring-Physics Travel Dot:** A buttery-smooth progress indicator that glides perfectly along the timeline dashes using custom spring physics—no jarring jumps.
- **🔒 Sequential Gamification:** Phases unlock one by one. Complete all tasks in a phase to trigger a screen shake, unlock the next stage, and watch the dot glide to its new target.
- **📑 Multi-Path Tabs:** Learning multiple things at once? The dashboard supports multiple hobbies with easy tab switching.
- **💾 Persistent Progress:** Your generated roadmaps and task progress are saved to your browser's local storage. Pick up right where you left off.
- **🎆 Celebration Effects:** Complete your final node and get a full-screen confetti reward.
- **🌌 Ambient Particle Background:** A subtle, floating particle canvas keeps the UI feeling alive and futuristic.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, CSS3, ES6 JavaScript |
| **Styling** | CSS Custom Properties, Flexbox, Orbitron + Inter Fonts |
| **AI Engine** | Groq API (`meta-llama/llama-4-scout-17b-16e-instruct`) |
| **Backend / Proxy** | Node.js, Express (Secures the API key) |
| **Hosting** | Render (Web Service) + GitHub (Codebase) |
| **Animations** | `requestAnimationFrame` Spring Physics, Canvas API |

---

## 🧗 Problems Encountered & Solutions

### 1. The "Rigid Dot" Misalignment
**The Problem:** Initially, the progress dot tracked the vertical center of the entire phase card. Because the card expanded and collapsed as tasks were revealed, the center point constantly shifted. This caused the dot to unalign from the horizontal "dash" connector and jump around rigidly.
**The Solution:** We replaced the CSS `::after` pseudo-element dash with a real DOM element (`.phase-dash`) positioned statically at the header. The JavaScript was rewritten to strictly query the `.phase-dash` coordinates. Now, the dot always aligns perfectly with the dash, regardless of how tall the card gets.

### 2. Choppy Animation During State Changes
**The Problem:** Using CSS `transition` for the dot's movement resulted in janky animations. If the user expanded a task while the dot was moving, the CSS transition would stutter and snap because it couldn't handle dynamic target changes mid-animation.
**The Solution:** We stripped out CSS transitions and built a custom `requestAnimationFrame` loop with **Spring Physics**. By applying `stiffness` and `damping` to the dot's velocity, it now smoothly glides to its target, naturally easing out, and dynamically adjusting if the target moves while it's traveling.

### 3. AI Hallucinating Roadmap Structures
**The Problem:** LLMs love to output "Ongoing" for timeframes or repeat "Week 1-3" for every phase, which breaks the sequential feel of a roadmap. They also frequently wrap JSON in markdown blocks.
**The Solution:** We engineered strict constraints in the prompt (e.g., *"If Phase 1 is Week 1-3, Phase 2 MUST be Week 4-7. NEVER use ongoing"*). We also forced `response_format: { type: "json_object" }` in the API call to ensure the data structure never broke the UI parser.

### 4. Exposed API Keys in Frontend Code
**The Problem:** Initially, the Groq API key was hardcoded into the `index.html` file. GitHub's security scanners flagged this, and anyone inspecting the page could steal the key.
**The Solution:** We built a lightweight Express.js backend proxy (`server.js`). The frontend now calls `/api/generate` on our server, and the server securely injects the API key from an environment variable (`process.env.GROQ_API_KEY`) before forwarding the request to Groq. The app is hosted on Render, which securely stores the key.

---

## 🚀 Getting Started

To run SkillForge locally or deploy your own version, follow these steps:

### Prerequisites
- Node.js installed on your machine
- A Groq API Key (Get one [here](https://console.groq.com/))

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/skillforge.git
   cd skillforge
   ```

2. **Install dependencies:**
   ```bash
   npm install express
   ```

3. **Set up your environment variable:**
   Create a file named `.env` in the root directory and add your API key:
   ```text
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```

5. **Open the app:**
   Navigate to `http://localhost:3000` in your browser.

### Deploying to Render (Recommended)

1. Push your code to a GitHub repository (ensure `.env` is in your `.gitignore`).
2. Go to [Render.com](https://render.com/) and sign up with GitHub.
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Configure the following:
   - **Runtime:** Node
   - **Build Command:** `npm install express`
   - **Start Command:** `node server.js`
6. Scroll down to **Environment Variables** and add:
   - Key: `GROQ_API_KEY` | Value: `your_actual_api_key`
7. Click **Create Web Service**. 

---

## 📁 Project Structure

```text
skillforge/
│
├── index.html        # The single-file frontend application (HTML, CSS, JS)
├── server.js         # Lightweight Express backend to secure the API key
├── .gitignore        # Ignores node_modules and .env
└── README.md         # You are here!
```

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
