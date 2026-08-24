# 🏏 Cric-Stat
Live at:: http://localhost:5173/

A full-stack cricket statistics tracker — log players, matches, and per-match batting & bowling performances, with a dashboard of live charts. Built with **React 19 (Vite)** on the front end and **Node.js + Express + MongoDB (Mongoose)** on the back end.

---

## 🗂️ Project Structure

```
Cric-stat/
├── README.md
├── client/                 # React 19 + Vite front end
│   ├── index.html          # Vite HTML entry → src/main.jsx
│   ├── vite.config.js      # Dev server + /api proxy to :5000
│   ├── tsconfig.json       # TypeScript config (strict)
│   └── src/
│       ├── main.jsx        # React root
│       ├── App.jsx         # Router, layout, themed toasts
│       ├── App.css         # Design system (dark, cricket-themed)
│       ├── api/            # axiosInstance + playerApi / matchApi / statApi
│       ├── components/     # Navbar, StatCard, Loader
│       └── pages/          # Dashboard, Players, Matches, Statistics
└── server/                 # Express + Mongoose API
    ├── index.js            # App, middleware, server boot
    ├── config/db.js        # MongoDB connection
    ├── models/            # Player, Match, Statistic (Mongoose schemas)
    ├── controllers/        # CRUD + cascade deletes
    ├── routes/            # Express routers
    └── middleware/        # 404 + error handler
```

---

## 🚀 Getting Started

### 1. Start MongoDB

The API connects to MongoDB via `MONGO_URI`. Run a local MongoDB (default `mongodb://localhost:27017`) — via the community server, Docker, or MongoDB Atlas.

```bash
# Docker example
docker run -d -p 27017:27017 --name cricstat mongo:7
```

The database `cricstat_db` is created automatically on first connection — no manual setup needed.

### 2. Configure Environment Variables

`server/.env` (a `.env.example` is included):

```
MONGO_URI=mongodb://localhost:27017/cricstat_db
PORT=5000
NODE_ENV=development
```

### 3. Install & Start the Backend

```bash
cd server
npm install
npm run dev      # nodemon
# or: npm start  (plain node)
```

Runs at **http://localhost:5000**.

### 4. Install & Start the Frontend

```bash
cd client
npm install
npm run dev
```

Runs at **http://localhost:5173**.

> During development the front end calls the API through a relative `/api` path, which Vite proxies to `http://localhost:5000` (see `vite.config.js`).

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET/POST | `/api/players` | List / Create players |
| GET/PUT/DELETE | `/api/players/:id` | Get / Update / Delete player (deletes cascade to that player's stats) |
| GET/POST | `/api/matches` | List / Create matches |
| GET/PUT/DELETE | `/api/matches/:id` | Get / Update / Delete match (deletes cascade to that match's stats) |
| GET/POST | `/api/stats` | List / Add statistics |
| GET | `/api/stats/player/:playerId` | Get stats for a specific player |
| PUT/DELETE | `/api/stats/:id` | Update / Delete stat |

All responses are shaped `{ success: boolean, data }` (or `{ success: false, message }` on error).

---

## ✨ Features

- 📊 **Dashboard** — KPI cards plus bar charts for matches-by-format and players-by-role, with a recent-matches table.
- 👤 **Players** — manage Batsman / Bowler / All-Rounder / Wicket-Keeper records with avatars.
- 🏟️ **Matches** — track Test / ODI / T20 fixtures (teams, venue, date, result, winner).
- 📈 **Statistics** — per-match batting & bowling lines (runs, balls, 4s, 6s, wickets, overs, runs conceded, catches, out).
- 🌑 **Premium dark UI** — fixed glass sidebar, gold + pitch-green accent system, glassy cards, and a cricket-ball loader.

---

## 🧰 Tech Stack

- **Front end:** React 19, React Router 7, Axios, Recharts, React Icons, react-hot-toast, Vite 8.
- **Back end:** Node.js, Express 4, Mongoose 8, CORS, dotenv.
- **Database:** MongoDB.
