# 3. System Architecture — How the Pieces Talk to Each Other

## 🧸 Explain it like I'm 5

Think of a restaurant:
- **You (the customer)** = the Frontend (what you see, the menu, the table)
- **The waiter** = the API (carries your order back and forth)
- **The kitchen** = the Backend (does the actual cooking/logic)
- **The fridge and pantry** = the Database (where ingredients/data are stored)

You never walk into the kitchen yourself — you always talk through the
waiter. That's exactly how Nook works: the browser (frontend) never touches
the database directly. It always talks through the API (backend).

## 🏗️ High-Level Architecture Diagram

```
┌───────────────┐        HTTPS/JSON        ┌────────────────┐
│               │  ───────────────────▶   │                │
│   BROWSER      │                          │   NestJS API    │
│  (React SPA)    │  ◀───────────────────   │   (Backend)      │
│               │        REST responses     │                │
└───────────────┘                          └────────┬─────────┘
                                                     │
                                     ┌───────────────┼───────────────┐
                                     │                                │
                            ┌────────▼────────┐            ┌──────────▼──────────┐
                            │   PostgreSQL      │            │     Cloudinary        │
                            │   (Neon, cloud)     │            │  (image uploads/CDN)   │
                            └────────────────────┘            └────────────────────────┘
```

## 🔁 A Real Example: "User adds a link to the Development Nook"

Walking through one action end-to-end helps everything click:

1. **User** pastes a URL into the "Add Item" form and clicks Save.
2. **Frontend** sends `POST /nooks/:nookId/items` with `{ type: "link", url: "..." }`.
3. **Backend (NestJS Controller)** receives the request, checks the JWT
   cookie to confirm the user is logged in.
4. **Backend (Service layer)** validates the input, optionally fetches the
   page title/preview image from the URL (metadata scraping), and builds a
   `SavedItem` record.
5. **Backend (TypeORM)** saves the new row into the `saved_items` table in
   PostgreSQL.
6. **Backend** responds with the newly created item as JSON.
7. **Frontend (TanStack Query)** updates its cache and the new item appears
   instantly in the Nook grid — no page refresh needed.

## 📂 Two Applications, One Repository (or Two Repos)

We treat Nook as **two separate apps** that talk over HTTP:

```
nook/
├── apps/
│   ├── web/        ← React frontend (Vite)
│   └── api/         ← NestJS backend
└── packages/
    └── shared-types/  ← TypeScript types shared by both (e.g. "Item", "Nook")
```

> This is called a **monorepo** (one repository, multiple apps). It's
> optional but recommended — see `07-developer-setup-guide.md` for the
> exact folder layout. If the team prefers, `web` and `api` can instead
> live in two completely separate GitHub repositories; the architecture
> and API contract stay identical either way.

## 🧱 Backend Internal Structure (NestJS "modules")

Each feature of Nook is its own **module** — a self-contained folder with
its own controller (handles HTTP requests), service (business logic), and
entity (database table definition).

```
apps/api/src/
├── auth/          → signup, login, JWT strategy
├── users/         → user profile, username, avatar
├── nooks/          → create/rename/delete Nooks, public/private toggle
├── items/          → create/update/delete Saved Items inside a Nook
├── tags/           → tag creation and filtering
├── public/         → the read-only endpoints for shared Nook pages
└── common/         → shared guards, decorators, filters, pipes
```

**Why split it this way?** So two developers can work on `items/` and
`nooks/` at the same time without their code colliding. This is the same
"one module = one responsibility" idea used throughout backend design.

## 🖼️ Frontend Internal Structure

```
apps/web/src/
├── pages/          → one file per route (Dashboard, NookPage, SharedNookPage, Profile)
├── components/      → reusable pieces (ItemCard, NookCard, AddItemModal, Navbar)
├── features/        → feature-specific logic (nooks/, items/, auth/) each with
│                       its own API calls (hooks) and small local components
├── lib/             → API client setup, helpers
├── store/            → Zustand global state (current user, UI state)
└── App.tsx           → routes setup
```

## 🔐 How Authentication Flows

```
1. User submits login form
2. POST /auth/login → backend checks email+password (bcrypt compare)
3. Backend creates a JWT, sends it back as an httpOnly cookie
4. Every future request automatically includes that cookie
5. Backend's "AuthGuard" checks the cookie's JWT on protected routes
6. If valid → request proceeds. If not → 401 Unauthorized
```

## 🌍 How the Public Share Feature Works (the killer feature)

```
Visitor opens:  nook.app/iftikhar/development
                        │
                        ▼
          Frontend route: /:username/:nookSlug
                        │
                        ▼
   GET /public/:username/:nookSlug   (NO login/cookie required)
                        │
                        ▼
   Backend checks: does this Nook exist AND is `isPublic = true`?
        │ yes                              │ no
        ▼                                  ▼
  Return Nook + all its Items      Return 404 "Nook not found or private"
        │
        ▼
  Frontend renders a read-only, public-styled page
  (no edit buttons, no delete buttons — just a clean showcase)
```

> **Security rule:** the `/public/*` endpoints must NEVER return private
> Nooks, and must never expose the owner's email or password hash — only
> username, display name, avatar, and the Nook's public items.

## 🔒 Key Architectural Rules (don't break these)

1. **The frontend never talks to the database directly.** Always through
   the API.
2. **Every write operation (create/update/delete) requires a valid JWT**,
   except the public share endpoints, which are always read-only (`GET`
   only).
3. **Ownership check on every write.** Before updating/deleting a Nook or
   Item, the backend must confirm `item.nook.user.id === currentUser.id`.
   Otherwise User A could delete User B's items just by guessing IDs.
4. **All API responses are JSON.** No HTML from the backend.
5. **Environment secrets** (DB password, JWT secret, Cloudinary keys) live
   in `.env` files that are **never committed to git**.
