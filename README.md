# Habit Tracker

A responsive habit-tracking web app built with React and the Context API for state management. Track daily habits, build streaks, and visualize your progress with animated charts — all backed by Clerk authentication and persisted per-user in the browser.

## Features

- 🔐 Authentication via Clerk (sign up, sign in, sign out)
- ✅ Add, check in, and delete daily habits
- 🔥 Automatic streak calculation
- 📊 Weekly activity bar chart + per-habit sparkline trends
- 🎨 Glassmorphic slate-themed UI with GSAP animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 💾 Data persisted to localStorage, scoped per logged-in user
- 🔔 Toast notifications for all actions (add, delete, check-in, sign-in/out)

## Tech Stack

- **React** + **Vite**
- **Context API** for global state (habits, streaks)
- **React Router DOM** for routing
- **Clerk** for authentication
- **Tailwind CSS** for styling
- **GSAP** for animations
- **Recharts** for data visualization
- **react-hot-toast** for notifications
- **Lucide React** for icons

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/habit-tracker.git
cd habit-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

This project requires a Clerk publishable key to handle authentication.

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application in the Clerk dashboard
3. Copy your **Publishable Key** from the API Keys section
4. Create a `.env` file in the project root (same folder as `package.json`)
5. Add the following line, replacing the placeholder with your actual key:
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
**Important:** The `.env` file is intentionally excluded from version control via `.gitignore` — never commit real API keys to a public repository. If you're setting this project up from a fresh clone, this `.env` file will not exist yet; you must create it yourself using the steps above, or the app will fail to load with an authentication error.

A `.env.example` file is included in the repo as a template — copy it and rename to `.env`, then fill in your real key:

```bash
cp .env.example .env
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure
src/
main.jsx # App entry point, providers setup
App.jsx # Root component, route/navbar logic
index.css # Global styles, theme tokens
context/
HabitContext.js # Global habit state (Context API)
routes/
Router.jsx # Route definitions
components/
Navbar.jsx
HabitCard.jsx
WeeklyActivityChart.jsx
ProtectedRoute.jsx
pages/
Dashboard.jsx
HabitDetail.jsx
Settings.jsx
SignInPage.jsx
SignUpPage.jsx
## Notes
- Habit data is stored in the browser's localStorage, keyed by the signed-in user's Clerk ID — data does not sync across devices or browsers.
- This project uses Clerk's development keys by default (shown in the console warning) — see [Clerk's deployment docs](https://clerk.com/docs/deployments/overview) before using this in production.
