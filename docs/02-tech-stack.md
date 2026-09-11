# 2. Tech Stack — The Tools We Build With

## 🧸 Explain it like I'm 5

Building an app is like building a house. You need:
- **Bricks and paint** (what the user sees and touches) → **Frontend**
- **Pipes and wiring hidden in the walls** (the logic nobody sees) →
  **Backend**
- **A storage room** where everything is kept safe → **Database**
- **A moving truck** that delivers the house to the world → **Deployment**

Below is exactly which "brand" of bricks, pipes, and storage we're using,
and why.

## 🖼️ Frontend (what the user sees)

| Tool | Why we picked it |
|---|---|
| **React 18** | Most popular UI library, huge community, component-based — easy for a team of juniors to split work |
| **Vite** | Super fast dev server and build tool, far faster than older tools like Create React App |
| **TypeScript** | Adds "labels" to our code (types) so bugs get caught while typing, not after the app breaks |
| **Tailwind CSS** | Utility-first styling — no separate CSS files to hunt through, fast to build clean, minimal UIs |
| **React Router** | Handles page navigation (`/dashboard`, `/nooks/development`, etc.) |
| **TanStack Query (React Query)** | Manages fetching, caching, and re-fetching data from our backend API without writing repetitive code |
| **Zustand** | Small, simple global state manager (e.g. "is the sidebar open", "current logged-in user") — much lighter than Redux |
| **React Hook Form + Zod** | Handles forms (login, create-Nook, add-item) and validates input with clear error messages |

> **Design direction:** minimal, clean UI — lots of white/neutral space,
> clear typography, no clutter. See `frontend-design` guidance during
> implementation for spacing/typography rules. Avoid decorative or
> "busy" component libraries; prefer building small custom components on
> top of Tailwind.

## ⚙️ Backend (the logic nobody sees)

| Tool | Why we picked it |
|---|---|
| **Node.js** | JavaScript on the server — same language as the frontend, so one developer can work on both sides |
| **NestJS** | A structured framework on top of Node/Express. It forces good organization (modules, controllers, services) which is very helpful for junior developers working in a team |
| **TypeScript** | Same reason as frontend — catches mistakes early |
| **TypeORM** | Lets us work with the database using TypeScript classes instead of writing raw SQL everywhere |
| **class-validator / class-transformer** | Validates incoming API requests (e.g. "title can't be empty") |
| **Passport.js + JWT** | Handles login sessions using JSON Web Tokens (a secure, standard way to say "yes, this user is logged in") |
| **bcrypt** | Safely scrambles (hashes) passwords before saving them — we NEVER store plain-text passwords |

## 🗄️ Database (where data lives)

| Tool | Why we picked it |
|---|---|
| **PostgreSQL** | A powerful, free, and reliable relational database — great fit because our data (Users → Nooks → Items) has clear relationships |
| **Neon** | A cloud host for PostgreSQL with a generous free tier, instant setup, and "serverless" scaling — no need to manage a physical database server |

## 🖼️ File / Image Storage

| Tool | Why we picked it |
|---|---|
| **Cloudinary** | Free tier, handles image uploads, resizing, and gives us a fast CDN link back — much simpler than managing our own file storage |

## 🔐 Authentication

| Tool | Why we picked it |
|---|---|
| **JWT (JSON Web Tokens)** | Stateless login tokens — the server doesn't need to "remember" every logged-in user, it just checks the token is valid |
| **httpOnly cookies** | We store the JWT in a cookie the browser's JavaScript can't read, which protects against a common attack (XSS token theft) |

## 🚀 Deployment (getting it onto the internet)

| Layer | Tool |
|---|---|
| Frontend hosting | **Vercel** (free tier, auto-deploys from GitHub, perfect for Vite/React apps) |
| Backend hosting | **Render** or **Railway** (free/cheap tier, easy Node.js deploys) |
| Database hosting | **Neon** (see above) |
| Image hosting | **Cloudinary** (see above) |
| Domain | `nook.app` (placeholder — replace with real domain when ready) |

## 🧰 Developer Tools (used while building, not shipped)

| Tool | Purpose |
|---|---|
| **pnpm** | Fast, disk-efficient package manager (alternative to npm) |
| **ESLint + Prettier** | Keeps code style consistent across the whole team automatically |
| **Husky + lint-staged** | Runs linting automatically before every git commit, so messy code never gets committed |
| **Postman / Thunder Client** | For manually testing API endpoints while building the backend |
| **Docker (optional, Phase 2)** | To run PostgreSQL locally without installing it directly on your laptop |
| **GitHub** | Source control + project board for tracking tasks |

## 📦 Full Stack At a Glance

```
┌─────────────────────────────────────────────┐
│                 FRONTEND                     │
│   React 18 + Vite + TypeScript + Tailwind    │
│   React Router · TanStack Query · Zustand    │
└───────────────────┬───────────────────────────┘
                    │  HTTPS (JSON over REST API)
┌───────────────────▼───────────────────────────┐
│                 BACKEND                       │
│         NestJS + TypeScript + TypeORM         │
│        Passport/JWT · class-validator          │
└─────────┬───────────────────────┬─────────────┘
          │                        │
┌─────────▼─────────┐   ┌──────────▼──────────┐
│   PostgreSQL       │   │     Cloudinary       │
│   (via Neon)        │   │  (image storage/CDN)  │
└────────────────────┘   └──────────────────────┘
```

## 🤔 "Why not X instead?" (common questions)

| Question | Short answer |
|---|---|
| Why not MongoDB? | Our data is very relational (User owns many Nooks, Nook owns many Items, Items have many Tags) — a SQL database like Postgres models that naturally with foreign keys, and prevents duplicated/inconsistent data |
| Why not plain Express instead of NestJS? | NestJS's enforced folder structure (modules/controllers/services) prevents the "one giant messy `index.js`" problem that's common when several junior developers work on the same backend |
| Why not Next.js? | We don't need server-side rendering or SEO-heavy pages for the private dashboard; a separate Vite SPA + API is simpler to reason about for a small team. (Public shared-Nook pages can be revisited for SSR/SEO in v2 — see `08-roadmap-mvp.md`) |
| Why not Firebase? | Firebase is great for speed, but we lose fine control over relational data and cost predictability as the app grows. Postgres + NestJS is more "learn real, transferable skills" for a junior dev team |
