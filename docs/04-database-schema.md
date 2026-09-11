# 4. Database Schema — Where and How Data Is Stored

## 🧸 Explain it like I'm 5

A database is like a school with labeled filing cabinets. One cabinet holds
**Students** (Users), one holds **Classrooms** (Nooks), and one holds
**Homework** (Saved Items). Each piece of paper (row) in the Homework
cabinet has a little sticky note saying *which classroom* it belongs to.
That sticky note is called a **foreign key** — it's how tables "know" about
each other.

## 🗺️ Entity Relationship Diagram (ERD)

```
┌─────────────┐        1        ┌─────────────┐        1        ┌─────────────┐
│    USERS      │ ─────────────▶ │    NOOKS      │ ─────────────▶ │ SAVED_ITEMS   │
│             │        many     │             │        many     │             │
└─────────────┘                └─────────────┘                └──────┬──────┘
                                                                       │ many
                                                                       ▼ many
                                                                ┌─────────────┐
                                                                │    TAGS      │
                                                                └─────────────┘
                                                       (linked via ITEM_TAGS join table)
```

**Reading this out loud:** "One User has many Nooks. One Nook has many
Saved Items. Saved Items can have many Tags, and each Tag can be on many
Items" (that's a many-to-many relationship, which needs a join table).

## 📋 Table: `users`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Primary key |
| `username` | VARCHAR(30) | Unique, lowercase, used in share URLs (`/iftikhar/...`) |
| `email` | VARCHAR(255) | Unique, used for login |
| `password_hash` | VARCHAR(255) | bcrypt hash — never store plain text |
| `display_name` | VARCHAR(60) | Shown on profile/shared pages |
| `avatar_url` | TEXT | Nullable, Cloudinary URL |
| `bio` | VARCHAR(280) | Nullable, short profile bio |
| `created_at` | TIMESTAMP | Default `now()` |
| `updated_at` | TIMESTAMP | Auto-updated |

## 📋 Table: `nooks`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Primary key |
| `user_id` | UUID (FK → users.id) | Owner of this Nook |
| `name` | VARCHAR(60) | e.g. "Development" |
| `slug` | VARCHAR(60) | URL-safe version, e.g. `development`. Unique **per user** |
| `description` | VARCHAR(280) | Nullable |
| `icon` | VARCHAR(10) | Nullable emoji, e.g. 💻 |
| `is_public` | BOOLEAN | Default `false`. Controls the share feature |
| `created_at` | TIMESTAMP | Default `now()` |
| `updated_at` | TIMESTAMP | Auto-updated |

> **Unique constraint:** `(user_id, slug)` must be unique together — so two
> different users can both have a Nook called "development", but you can't
> have two of your own Nooks with the same slug.

## 📋 Table: `saved_items`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Primary key |
| `nook_id` | UUID (FK → nooks.id) | Which Nook this item lives in |
| `type` | ENUM('link','image','note') | The 3 base types (see below) |
| `title` | VARCHAR(120) | Required |
| `content` | TEXT | For `note`: the note text. For `link`: the URL. For `image`: the Cloudinary URL |
| `preview_image_url` | TEXT | Nullable — auto-fetched thumbnail for links, or the image itself for `image` type |
| `source_url` | TEXT | Nullable — original URL if applicable |
| `display_category` | VARCHAR(30) | Nullable — the "friendly label": `design`, `dev-resource`, `video`, `idea` (purely cosmetic, drives which icon shows) |
| `position` | INTEGER | For manual drag-and-drop ordering within a Nook |
| `created_at` | TIMESTAMP | Default `now()` |
| `updated_at` | TIMESTAMP | Auto-updated |

> **Why only 3 real `type` values?** As explained in
> `01-product-overview.md`, "Design Inspiration" is just an `image` item,
> "Dev Resource" and "Video" are just `link` items, and "Idea" is just a
> `note`. The `display_category` column stores the *friendly label* so the
> UI can show the right icon/badge, without needing 7 different database
> types and 7 different pieces of logic.

## 📋 Table: `tags`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | Primary key |
| `user_id` | UUID (FK → users.id) | Tags are scoped per-user |
| `name` | VARCHAR(30) | e.g. "vue", "css" — lowercase, no spaces |

> Unique constraint: `(user_id, name)` — you can't have two tags with the
> same name.

## 📋 Table: `item_tags` (join table for many-to-many)

| Column | Type | Notes |
|---|---|---|
| `item_id` | UUID (FK → saved_items.id) | |
| `tag_id` | UUID (FK → tags.id) | |

Primary key is the pair `(item_id, tag_id)` together.

## 🧾 SQL (for reference — TypeORM will generate this via migrations)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(60) NOT NULL,
  avatar_url TEXT,
  bio VARCHAR(280),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE nooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(60) NOT NULL,
  slug VARCHAR(60) NOT NULL,
  description VARCHAR(280),
  icon VARCHAR(10),
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE (user_id, slug)
);

CREATE TYPE item_type AS ENUM ('link', 'image', 'note');

CREATE TABLE saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nook_id UUID NOT NULL REFERENCES nooks(id) ON DELETE CASCADE,
  type item_type NOT NULL,
  title VARCHAR(120) NOT NULL,
  content TEXT NOT NULL,
  preview_image_url TEXT,
  source_url TEXT,
  display_category VARCHAR(30),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(30) NOT NULL,
  UNIQUE (user_id, name)
);

CREATE TABLE item_tags (
  item_id UUID NOT NULL REFERENCES saved_items(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (item_id, tag_id)
);
```

## 🗃️ Indexes (for speed — add these once data grows)

- `nooks (user_id)` — fast "get all my Nooks"
- `nooks (user_id, slug)` — fast public share lookup
- `saved_items (nook_id)` — fast "get all items in this Nook"
- `saved_items (nook_id, position)` — fast ordered fetch
