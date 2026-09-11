# 1. Product Overview — What is Nook?

## 🧸 Explain it like I'm 5

Imagine you have a toy box. But instead of one big messy box where you throw
*everything*, you have small labeled baskets: one for cars, one for blocks,
one for dolls. Whenever you find a cool toy, you put it in the right basket.
Later, you can show your friend just the "cars" basket, without showing them
your whole messy room.

**Nook is that toy box, but for the internet.**

Right now, when Iftikhar (or anyone) finds something cool online — a link, a
picture, a note, a video — it gets scattered everywhere: browser bookmarks,
Discord "saved messages", random screenshots, Notion pages. It's messy, and
nothing is in one place.

Nook fixes that. You save things into little baskets called **"Nooks"**
(like "Development", "Inspiration", "Learning"), and you can even hand a
friend the "Development" basket with one link, without giving them your
whole room.

## 🎯 The Problem We're Solving

| Today, without Nook | With Nook |
|---|---|
| Bookmarks live in the browser only | Bookmarks live in your account, on any device |
| Cool designs are lost in random screenshots | Saved as "Inspiration" items with images |
| Useful code links get buried in Discord | Saved in a "Development" Nook, tagged and searchable |
| You can't show your curated list to anyone | You can share a Nook with one public link |

## 👤 Who is this for?

- **Primary user:** developers, designers, and students who constantly
  collect links/resources and want one home for them.
- **Secondary audience:** anyone who visits a *shared* Nook (they don't even
  need an account to view it).

## 🧩 Core Concepts (the vocabulary of Nook)

| Term | Meaning |
|---|---|
| **User** | A person with a Nook account |
| **Nook** | A named collection/folder (e.g. "Development"). A user can have many Nooks |
| **Saved Item** | One thing saved inside a Nook — a link, image, note, video, or idea |
| **Tag** | An optional label on a Saved Item (e.g. "vue", "css") for filtering |
| **Share Link** | A public, read-only URL for a Nook, e.g. `nook.app/iftikhar/development` |

## 🗺️ App Sections (from the case study)

```
Nook
│
├── Dashboard        → quick overview: recent items, all your Nooks
├── Nooks             → list of your folders (Development, Inspiration, ...)
│    └── [Nook page]  → grid of Saved Items inside one Nook
├── Saved Items        → every item you've ever saved, across all Nooks
└── Profile            → your account, your public username, settings
```

## 📥 What can you save? (Item Types for MVP)

| Icon | Type | What it stores |
|---|---|---|
| 🔗 | Link | URL + auto-fetched title/preview |
| 🖼️ | Image | Uploaded image or image URL |
| 📝 | Note | Plain text/markdown note |
| 🎨 | Design Inspiration | Treated as an Image item with a "design" tag/nook |
| 💻 | Dev Resource | Treated as a Link item with a "dev" tag/nook |
| 🎬 | Video | Video URL (YouTube/Vimeo link, embedded preview) |
| 💡 | Idea | Same as a Note, just a different icon/label |

> **Simple rule for developers:** under the hood, there are really only
> **3 base item types** — `link`, `image`, `note` — because "design
> inspiration", "dev resource", "video", and "idea" are all just a link or
> image or note with a different icon and tag. This keeps the database and
> code simple. See `04-database-schema.md`.

## ⭐ The ONE Killer Feature: Share Your Nook

Every Nook can be made **public**. When public, anyone in the world can
visit:

```
nook.app/<username>/<nook-slug>
```

...and see a **read-only**, beautifully laid-out page of everything in that
Nook. No login needed to view. This is what turns Nook from "my private
bookmark manager" into "a thing I can show off" — like a public Spotify
playlist, but for links and ideas.

## 🚫 What Nook is NOT (in the MVP)

To keep the first version buildable and shippable, we are **intentionally
not** building (yet):

- Team/multi-user collaboration on one Nook
- Browser extension (comes later, v2)
- Full-text search inside saved articles
- Comments or likes on shared Nooks
- Mobile apps (we build a responsive website first)

## ✅ MVP Feature Checklist (high level)

- [ ] Sign up / log in
- [ ] Create, rename, delete a Nook
- [ ] Add a Saved Item (link, image, or note) to a Nook
- [ ] Move/delete a Saved Item
- [ ] Tag items and filter by tag
- [ ] Dashboard showing recent items across all Nooks
- [ ] Make a Nook public and get a shareable link
- [ ] Public read-only Nook page (no login required)
- [ ] Basic profile page (username, avatar, bio)

Full detail on every requirement is in `06-srs-requirements.md`.
