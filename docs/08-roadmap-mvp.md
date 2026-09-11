# 8. Roadmap — Building Nook Step by Step

## 🧸 Explain it like I'm 5

You can't build a house by putting the roof on first. You lay the
foundation, build the walls, then add the roof and paint. This roadmap is
the *order* to build Nook in, so at every step you have something that
actually works — never a pile of half-finished pieces.

Each phase below assumes roughly **1 week of focused work** for a small
team (adjust to your own pace — the *order* matters more than the exact
timing).

---

## 🧱 Phase 0 — Foundation (Setup Week)

**Goal:** empty-but-running app, deployed, with login working.

- [ ] Set up monorepo, install tooling (ESLint/Prettier/Husky)
- [ ] Set up NestJS project skeleton + connect to Neon Postgres
- [ ] Set up React + Vite + Tailwind skeleton
- [ ] Build `users` table + signup/login/logout (FR-1.1–1.4)
- [ ] Deploy empty shells to Vercel (web) + Render (api) — confirm the
      whole pipeline works end-to-end before building real features

**You're done with Phase 0 when:** you can sign up, log in, and see a
blank "Dashboard" page, on the live deployed URL.

---

## 📁 Phase 1 — Nooks CRUD

**Goal:** users can create and manage their folders.

- [ ] `nooks` table + `POST/GET/PATCH/DELETE /nooks` (FR-2.1–2.3)
- [ ] Dashboard page listing all Nooks as cards
- [ ] "Create Nook" modal (name, icon, description)
- [ ] Nook detail page (empty state: "No items yet")

**Done when:** a user can create "Development", "Inspiration", etc., see
them on the dashboard, and click into an empty Nook page.

---

## 🧷 Phase 2 — Saved Items

**Goal:** the core value of the app — actually saving things.

- [ ] `saved_items` table + full CRUD API (FR-3.1–3.5)
- [ ] "Add Item" modal with type switcher (Link / Note / Image)
- [ ] Link metadata auto-fetch (title + preview image scraping)
- [ ] Cloudinary image upload wired up
- [ ] Item card component (grid layout, matches the case study's basket
      idea — minimal, clean cards)
- [ ] Delete item with confirmation

**Done when:** a user can add real links, notes, and images into a Nook
and see them rendered as cards.

---

## 🏷️ Phase 3 — Tags & Dashboard Polish

**Goal:** organizing and finding things again.

- [ ] `tags` + `item_tags` tables, tag input on Add Item form (FR-4.1)
- [ ] Filter a Nook's items by tag (FR-4.2)
- [ ] Real Dashboard: recent items feed + counts (FR-5.1–5.3)
- [ ] In-Nook search by title (FR-4.3)

**Done when:** the dashboard feels alive and useful on day 2 of using the
app, not just day 1.

---

## ⭐ Phase 4 — Sharing (the killer feature)

**Goal:** ship the feature that makes Nook a *product*, not just a tool.

- [ ] Add `isPublic` toggle UI on Nook settings
- [ ] `GET /public/:username/:nookSlug` endpoint (FR-6.1, 6.3)
- [ ] Public read-only Nook page component (no edit controls) (FR-6.2)
- [ ] "Copy share link" button + toast confirmation (FR-6.4)
- [ ] Open Graph meta tags for nice link previews (FR-6.5)

**Done when:** you can toggle a Nook public, copy the link, open it in an
incognito window, and see a clean read-only page.

---

## 👤 Phase 5 — Profile & Finishing Touches

**Goal:** make the app feel complete and shareable as a whole identity,
not just individual Nooks.

- [ ] Profile edit page (display name, avatar, bio) (FR-7.1)
- [ ] Public profile page listing a user's public Nooks (FR-7.2)
- [ ] Empty states, loading skeletons, error states everywhere
- [ ] Mobile responsiveness pass (NFR-3)
- [ ] Basic accessibility pass (NFR-6)
- [ ] Final QA pass against the full checklist in `06-srs-requirements.md`

**Done when:** every "Must" item in the SRS is checked off.

---

## 🚀 Phase 6 — Launch

- [ ] Point real domain (`nook.app`) at Vercel + Render
- [ ] Set production environment variables
- [ ] Smoke-test signup → create Nook → add item → make public → share,
      on the real production URL
- [ ] Announce! 🎉

---

## 🔭 Post-MVP Ideas (v2 — not now, but keep in mind)

These came up in the case study or naturally follow from it — don't build
them yet, but the architecture in `03-architecture.md` and
`04-database-schema.md` was designed so none of these require a rewrite:

| Idea | Why it's a natural v2 |
|---|---|
| Browser extension ("save this page" button) | Just calls the existing `POST /nooks/:id/items` API |
| Server-side rendering for shared Nook pages | Better SEO/social previews; swap the public route to a Next.js-rendered page later without touching the API |
| Global search across all Nooks | Add a search index (e.g. Postgres full-text search) on top of existing tables |
| Team Nooks (multiple owners) | Would need a `nook_members` join table — schema already isolates ownership in one place, making this additive, not a rewrite |
| View counters / analytics on shared Nooks | Add a lightweight `nook_views` table |
