# 7. Developer Setup Guide — Getting Nook Running On Your Laptop

## 🧸 Explain it like I'm 5

Setting up a project is like setting up a train set before playing: you
need to lay the tracks (install tools), connect the pieces (install
dependencies), and plug in the power (start the servers). Do these steps
**in order** and don't skip any.

## 🧰 Step 0: Software You Need Installed First

| Tool | Version | Check with | Download |
|---|---|---|---|
| Node.js | v20 LTS or newer | `node -v` | nodejs.org |
| pnpm | v9+ | `pnpm -v` | `npm install -g pnpm` |
| Git | any recent | `git -v` | git-scm.com |
| PostgreSQL client (optional, for viewing data) | any | — | TablePlus / DBeaver / pgAdmin |
| VS Code (recommended editor) | any | — | code.visualstudio.com |

You will also need **free accounts** on:
- [Neon](https://neon.tech) — PostgreSQL database
- [Cloudinary](https://cloudinary.com) — image storage

## 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/<org>/nook.git
cd nook
```

## 📂 Step 2: Recommended Monorepo Folder Structure

```
nook/
├── apps/
│   ├── web/                 # React + Vite frontend
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── .env
│   └── api/                  # NestJS backend
│       ├── src/
│       ├── package.json
│       └── .env
├── packages/
│   └── shared-types/          # TS types shared between web & api
├── package.json                # root workspace config
├── pnpm-workspace.yaml
└── README.md
```

## ⚙️ Step 3: Environment Variables

Create `apps/api/.env`:
```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require
JWT_SECRET=replace-with-a-long-random-string
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:5173
```

Create `apps/web/.env`:
```env
VITE_API_URL=http://localhost:4000/api
```

> ⚠️ **Never commit `.env` files.** Make sure `.gitignore` includes `.env`
> at the root and inside each app. Commit `.env.example` files (same keys,
> no real values) so teammates know what's needed.

## 📦 Step 4: Install Dependencies

From the repo root (pnpm workspaces install everything at once):
```bash
pnpm install
```

## 🗄️ Step 5: Set Up the Database

1. Create a free project on [neon.tech](https://neon.tech), copy the
   connection string into `DATABASE_URL`.
2. Run migrations to create all the tables from `04-database-schema.md`:
```bash
cd apps/api
pnpm run migration:run
```
3. (Optional) Seed some sample data:
```bash
pnpm run seed
```

## ▶️ Step 6: Run Both Apps in Development

Open two terminal tabs:

**Terminal 1 — backend:**
```bash
cd apps/api
pnpm run start:dev
# API running at http://localhost:4000
```

**Terminal 2 — frontend:**
```bash
cd apps/web
pnpm run dev
# App running at http://localhost:5173
```

Visit `http://localhost:5173` in your browser — you should see the Nook
login page. 🎉

## 🧪 Step 7: Running Tests

```bash
# backend unit tests
cd apps/api && pnpm test

# frontend component tests
cd apps/web && pnpm test
```

## 🧹 Step 8: Code Style Rules

- Run `pnpm lint` before every commit (or let Husky do it automatically).
- Never use `any` in TypeScript — if you're stuck, ask, don't silence the
  error.
- One component = one file. Keep components under ~150 lines; extract
  sub-components if it grows past that.
- Name files consistently: `PascalCase.tsx` for components,
  `camelCase.ts` for hooks/utils.

## 🌿 Step 9: Git Workflow

1. Never commit directly to `main`.
2. Branch naming: `feature/add-item-modal`, `fix/nook-delete-bug`.
3. Open a Pull Request, get at least one review, then merge.
4. Keep commits small and message them clearly:
   `feat(items): add drag-and-drop reordering`.

## 🆘 Common Setup Problems

| Problem | Fix |
|---|---|
| `ECONNREFUSED` connecting to DB | Check `DATABASE_URL` is correct and includes `?sslmode=require` for Neon |
| CORS errors in browser console | Confirm `CLIENT_URL` in `apps/api/.env` matches the frontend's exact URL |
| "JWT malformed" errors | Clear cookies for `localhost` and log in again — usually a stale/old token |
| Image upload fails | Double-check Cloudinary env vars are copied exactly (no extra spaces) |
