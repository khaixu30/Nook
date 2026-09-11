# 6. Software Requirements Specification (SRS)

## 🧸 Explain it like I'm 5

This document is a **checklist** of "must build this" vs "can skip this for
now" — like a grocery list before a big shopping trip, so nobody buys (or
builds!) the wrong thing.

We use a system called **MoSCoW**:
- **M**ust have — the app is broken without it
- **S**hould have — important, but the app works without it for launch
- **C**ould have — nice bonus if there's time
- **W**on't have (this time) — explicitly out of scope for the MVP

---

## ✅ Functional Requirements

### FR-1: Authentication
| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | User can sign up with email, username, password | Must |
| FR-1.2 | User can log in / log out | Must |
| FR-1.3 | Passwords are hashed with bcrypt before storage | Must |
| FR-1.4 | Session persists across page refresh (JWT cookie) | Must |
| FR-1.5 | "Forgot password" email flow | Should |
| FR-1.6 | Social login (Google) | Could |

### FR-2: Nooks
| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | User can create a Nook with a name and icon | Must |
| FR-2.2 | User can rename/edit description/icon of a Nook | Must |
| FR-2.3 | User can delete a Nook (with confirmation, cascades to items) | Must |
| FR-2.4 | User can toggle a Nook between public/private | Must |
| FR-2.5 | User can reorder their Nooks on the dashboard | Could |

### FR-3: Saved Items
| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | User can add a Link item (auto-fetch title & preview image) | Must |
| FR-3.2 | User can add a Note item (plain text) | Must |
| FR-3.3 | User can add an Image item (upload to Cloudinary) | Must |
| FR-3.4 | User can edit an item's title/content/tags | Must |
| FR-3.5 | User can delete an item | Must |
| FR-3.6 | User can move an item to a different Nook | Should |
| FR-3.7 | User can drag-and-drop to reorder items within a Nook | Could |
| FR-3.8 | Markdown formatting inside Note items | Could |

### FR-4: Tags & Search
| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | User can add tags to an item | Must |
| FR-4.2 | User can filter a Nook's items by tag | Must |
| FR-4.3 | User can search items by title (within a Nook) | Should |
| FR-4.4 | Global search across all Nooks | Could |

### FR-5: Dashboard
| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | Dashboard shows total Nook count and item count | Must |
| FR-5.2 | Dashboard shows recently added items | Must |
| FR-5.3 | Dashboard shows a quick-access grid of all Nooks | Must |

### FR-6: Sharing (⭐ the killer feature)
| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Public Nooks are reachable at `/​:username/​:nookSlug` with no login | Must |
| FR-6.2 | Public Nook page is read-only (no edit/delete controls visible) | Must |
| FR-6.3 | Private Nooks return 404 when visited via public URL | Must |
| FR-6.4 | A "Copy share link" button exists on public Nooks | Must |
| FR-6.5 | Open Graph meta tags on shared pages (nice preview when link is pasted in Discord/Twitter) | Should |
| FR-6.6 | View counter on shared Nooks | Could |

### FR-7: Profile
| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | User can set display name, avatar, bio | Must |
| FR-7.2 | Public profile page listing a user's public Nooks | Should |

---

## ⚙️ Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Performance:** Dashboard and Nook pages should load in under 1.5s on a normal connection |
| NFR-2 | **Security:** All passwords hashed (bcrypt, cost factor ≥ 10); JWT stored in httpOnly cookies; ownership checked on every write |
| NFR-3 | **Responsiveness:** UI must work well on mobile, tablet, and desktop widths |
| NFR-4 | **Availability:** Backend and DB hosted on providers with ≥ 99% uptime SLA (Render/Neon free tiers acceptable for MVP) |
| NFR-5 | **Data validation:** All API inputs validated server-side (never trust the frontend alone) |
| NFR-6 | **Accessibility:** Basic a11y — semantic HTML, alt text on images, keyboard-navigable forms |
| NFR-7 | **Code quality:** ESLint + Prettier enforced via pre-commit hook; TypeScript strict mode enabled on both apps |
| NFR-8 | **Scalability (soft target):** Comfortably support 10,000 users / 500,000 saved items on the MVP architecture before any re-architecture is needed |

---

## 🚫 Out of Scope for MVP (Won't Have — this round)

- Real-time collaborative editing of a shared Nook
- Team/organization accounts
- Browser extension for one-click saving
- Native mobile apps (iOS/Android)
- Full-text search inside linked articles' content
- Comments/likes/follows on shared Nooks
- Payment/subscription tiers

These are all good **v2 ideas** — see `08-roadmap-mvp.md` for where they
might fit later.

---

## 👥 Example User Stories

- *As a new user*, I want to sign up in under a minute so I can start
  saving things immediately.
- *As a developer*, I want to paste a link and have Nook auto-fetch its
  title and thumbnail, so I don't have to type everything by hand.
- *As a returning user*, I want my dashboard to show me what I saved
  recently, so I can pick up where I left off.
- *As a portfolio-builder*, I want to share my "Inspiration" Nook with a
  simple public link, so I can show it to a client without giving them
  access to my private Nooks.
- *As a visitor*, I want to view someone's shared Nook without creating an
  account, so I can quickly browse their curated links.
