# 5. API Specification — Every Door the Frontend Can Knock On

## 🧸 Explain it like I'm 5

An API is like a restaurant menu. The frontend doesn't walk into the
kitchen and cook — it points at an item on the menu ("give me `GET
/nooks`") and the kitchen (backend) brings back exactly that.

**Base URL (development):** `http://localhost:4000/api`
**Base URL (production):** `https://api.nook.app/api`

All responses are JSON. All protected routes require the login cookie
(see `03-architecture.md` → Authentication Flow).

Legend: 🔓 = public (no login needed) · 🔒 = requires login

---

## 🔑 Auth

### 🔓 `POST /auth/signup`
Create a new account.

**Body:**
```json
{ "email": "iftikhar@example.com", "username": "iftikhar", "password": "••••••••", "displayName": "Iftikhar" }
```
**Response 201:**
```json
{ "id": "uuid", "username": "iftikhar", "email": "iftikhar@example.com", "displayName": "Iftikhar" }
```
**Errors:** `409` if email or username already taken.

### 🔓 `POST /auth/login`
**Body:** `{ "email": "...", "password": "..." }`
**Response 200:** sets httpOnly cookie + returns user object.
**Errors:** `401` wrong credentials.

### 🔒 `POST /auth/logout`
Clears the auth cookie. **Response 200.**

### 🔒 `GET /auth/me`
Returns the currently logged-in user (used on app load to check session).

---

## 👤 Users

### 🔒 `PATCH /users/me`
Update your own profile (display name, bio, avatar).

### 🔓 `GET /users/:username`
Public profile info (used on shared Nook pages) — returns only
`username`, `displayName`, `avatarUrl`, `bio`. **Never** email or password.

---

## 📁 Nooks

### 🔒 `GET /nooks`
List all Nooks belonging to the logged-in user.
**Response:**
```json
[
  { "id": "uuid", "name": "Development", "slug": "development", "icon": "💻", "isPublic": true, "itemCount": 24 }
]
```

### 🔒 `POST /nooks`
Create a new Nook.
**Body:** `{ "name": "Development", "icon": "💻", "description": "..." }`
**Response 201:** the created Nook (slug is auto-generated from name).

### 🔒 `GET /nooks/:id`
Get one Nook's details + its items (owner view — includes private ones).

### 🔒 `PATCH /nooks/:id`
Update name/description/icon/`isPublic`.
> ⚠️ Toggling `isPublic: true` is what activates the share link feature.

### 🔒 `DELETE /nooks/:id`
Deletes the Nook and **cascades** — all its Saved Items are deleted too
(warn the user with a confirmation dialog on the frontend!).

---

## 🧷 Saved Items

### 🔒 `GET /nooks/:nookId/items`
List items in a Nook. Supports query params:
`?tag=vue` · `?type=link` · `?search=postgres`

### 🔒 `POST /nooks/:nookId/items`
Add a new item.
**Body (link example):**
```json
{ "type": "link", "title": "Vue Patterns", "content": "https://vuepatterns.com", "displayCategory": "dev-resource", "tags": ["vue"] }
```
**Body (note example):**
```json
{ "type": "note", "title": "Idea: dark mode toggle", "content": "Add a system-preference-aware dark mode.", "displayCategory": "idea" }
```
**Response 201:** the created item, with `previewImageUrl` auto-filled for
links when possible (backend fetches Open Graph metadata).

### 🔒 `PATCH /items/:id`
Update title/content/tags/`displayCategory`/`position` (used for
drag-and-drop reordering, and for moving an item to a different Nook via
`nookId`).

### 🔒 `DELETE /items/:id`

---

## 🏷️ Tags

### 🔒 `GET /tags`
List all of the current user's tags (for filter dropdowns/autocomplete).

### 🔒 `DELETE /tags/:id`
Removes a tag (and its links in `item_tags`), items themselves are kept.

---

## 🌍 Public Sharing (the killer feature)

### 🔓 `GET /public/:username/:nookSlug`
Returns a public, read-only view of a Nook — **only if `isPublic = true`**.
**Response 200:**
```json
{
  "owner": { "username": "iftikhar", "displayName": "Iftikhar", "avatarUrl": "..." },
  "nook": { "name": "Development", "description": "...", "icon": "💻" },
  "items": [ { "id": "...", "type": "link", "title": "Vue Patterns", "content": "https://..." } ]
}
```
**Errors:** `404` if the Nook doesn't exist OR is private (same error for
both, so strangers can't tell the difference between "doesn't exist" and
"exists but private").

---

## 📊 Dashboard (aggregated convenience endpoint)

### 🔒 `GET /dashboard`
**Response:**
```json
{
  "nookCount": 4,
  "itemCount": 87,
  "recentItems": [ /* last 10 items across all Nooks */ ],
  "nooks": [ /* summary list, same shape as GET /nooks */ ]
}
```

---

## 🧯 Standard Error Shape

Every error follows the same shape so the frontend can handle them
generically:

```json
{ "statusCode": 404, "message": "Nook not found", "error": "Not Found" }
```

## 🔒 Auth Header/Cookie Reminder

Every 🔒 route expects the `nook_auth` httpOnly cookie set during login. If
missing/invalid/expired → `401 Unauthorized`. If valid but the user doesn't
own the resource being modified → `403 Forbidden`.
