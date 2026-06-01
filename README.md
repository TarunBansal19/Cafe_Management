# Cafe Management MVP

A backend application for managing café operations — orders, billing, inventory, and AI-powered inventory detection. Built with Node.js, Express.js, PostgreSQL, and Prisma ORM.

---

## Features

- **Orders** — Create, list, update status (`PENDING → PREPARING → DONE`), and delete orders
- **Billing** — Generate invoices with tax and discount support (percent or fixed)
- **Inventory** — Full CRUD for inventory items with unit tracking
- **AI Detection** — Upload an image and let OpenAI Vision auto-create an inventory item

---

## Tech Stack

Node.js · Express.js  · PostgreSQL  · Prisma  · Zod · OpenAI API · ImageKit · Docker

---

## Prerequisites

- Node.js and pnpm 
- PostgreSQL **or** Docker
- OpenAI API key (for AI Vision)
- ImageKit credentials (for image storage)

---

## Environment Variables

Create a `.env` file in `backend/` (local) or project root (Docker):

```env
DATABASE_URL=postgresql://username:password@localhost:5432/cafe_db

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_account_id/

PORT=3000
```

> For Docker, `DATABASE_URL` is set automatically via `docker-compose.yml`.

---

## Local Installation

```bash
git clone https://github.com/TarunBansal19/Cafe_Management.git
cd cafe_mvp/backend

pnpm install
cp .env.example .env   # fill in your values

pnpm prisma generate
pnpm prisma migrate deploy

pnpm dev               # starts at http://localhost:3000
```

---

## Docker Setup

```bash
git clone https://github.com/TarunBansal19/Cafe_Management.git
cd cafe_mvp

# Add your API keys to .env in project root
docker compose build
docker compose up

# First time only — run migrations
docker compose run --rm backend pnpm prisma migrate deploy
```

Server available at `http://localhost:3000`.

```bash
docker compose down        # stop services
docker compose down -v     # stop + remove volumes
```

---

## API Overview

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order |
| GET | `/orders` | List orders |
| GET | `/orders/:id` | Get order |
| PATCH | `/orders/:id/status` | Update status |
| DELETE | `/orders/:id` | Delete order |
| POST | `/billing/order/:orderId` | Generate invoice |
| GET | `/billing/:invoiceId` | Get invoice |
| POST | `/inventory` | Create item |
| GET | `/inventory` | List items |
| GET | `/inventory/:id` | Get item |
| PATCH | `/inventory/:id` | Update item |
| DELETE | `/inventory/:id` | Delete item |
| POST | `/inventory/upload` | Create item from image (AI) |

All responses follow:
```json
{ "data": {}, "message": "..." }         // success
{ "error": "...", "status": 400 }        // error
```

---

## AI Inventory Detection

Upload an image → ImageKit stores it → OpenAI Vision identifies the item → inventory record auto-created.


Supported formats: JPG, PNG, WebP, GIF (max 20MB).

---

## Testing

Import `postman/Cafe-MVP-Postman-Collection.json` into Postman and point the base URL at `http://localhost:3000/api/v1`.

---

s