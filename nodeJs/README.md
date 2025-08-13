# Business CMS API (Node.js + Express + MongoDB)

Hi! this is my Node.js final project. I built a production‑style REST API for a Business Content Management System. Business users can register, log in, create/update/delete business cards, and like/unlike cards. The server includes authentication, authorization, validation, logging, and seeding.

## What’s inside

- Node.js + Express (HTTP server)
- MongoDB Atlas + Mongoose (ODM)
- JWT auth (payload includes `_id`, `isBusiness`, `isAdmin`)
- Password hashing with bcryptjs
- Input validation with Joi
- Morgan logger, CORS, dotenv for environment variables
- Seed script for 3 demo users and 3 demo cards

## Quick start

1. Clone and install

```sh
git clone <repo-url>
cd <project-folder>
npm install
```

2. Environment variables
   Copy `.env.example` to `.env` and fill in your values:

```
PORT=3000
MONGO_URI=<your-atlas-connection-string-with-db-name>
# Optional for local development:
MONGO_URI_LOCAL=mongodb://127.0.0.1:27017/<db>
JWT_SECRET=<strong-random-secret>
```

3. Seed demo data (optional but recommended)

```sh
npm run seed
```

This creates 3 users and 3 cards:

- Regular: first@gmail.com / Aa1234!
- Business: biz@gmail.com / Aa1234!
- Admin: admin@gmail.com / Aa1234!

4. Run the server

```sh
npm start
```

Or with auto‑reload during development:

```sh
npm run dev
```

## Basic usage

1. Log in to get a JWT

```sh
curl -s -X POST http://localhost:3000/users/login \
   -H 'Content-Type: application/json' \
   -d '{"email":"biz@gmail.com","password":"Aa1234!"}'
```

You’ll get `{ "token": "..." }`. Use it as `Authorization: Bearer <TOKEN>` (or `x-auth-token`).

2. Cards

- All cards (public):

```sh
curl -s http://localhost:3000/cards
```

- My cards (requires token):

```sh
curl -s http://localhost:3000/cards/my-cards -H "Authorization: Bearer <TOKEN>"
```

- Create a card (business user only):

```sh
curl -s -X POST http://localhost:3000/cards \
   -H "Authorization: Bearer <TOKEN>" \
   -H "Content-Type: application/json" \
   -d '{
      "title": "test123",
      "subtitle": "testing",
      "description": "testing 123",
      "phone": "050-0000000",
      "email": "testing@gmail.com",
      "web": "https://www.test.co.il",
      "image": { "url": "", "alt": "" },
      "address": {
         "state": "",
         "country": "test",
         "city": "test",
         "street": "test",
         "houseNumber": 3,
         "zip": "0"
      }
   }'
```

## REST endpoints (summary)

### Users (/users)

- POST /users/register – register a new user
- POST /users/login – log in and receive a JWT
- GET /users – admin only
- GET /users/:id – the user themself or admin
- PUT /users/:id – update user profile (self)
- PATCH /users/:id – toggle isBusiness (self)
- DELETE /users/:id – delete user (self/admin)
- PATCH /users/bizNumber/:id – admin updates business number (unique)

### Cards (/cards)

- GET /cards – list all cards (public)
- GET /cards/my-cards – list cards for the logged‑in user
- GET /cards/:id – get a single card
- POST /cards – create a card (business user)
- PUT /cards/:id – update a card (creator)
- PATCH /cards/:id – like/unlike a card (logged‑in user)
- DELETE /cards/:id – delete a card (creator/admin)

## Security & logging

- Passwords are hashed with bcryptjs
- JWT payload includes `_id`, `isBusiness`, `isAdmin`
- 24‑hour account lock after 3 consecutive failed logins
- Morgan logs every request to the console
- Error logs (HTTP 400+) are written to `logs/YYYY-MM-DD.log`

## Project structure (high level)

```
./
├── app.js
├── db/dbService.js
├── models/
├── routes/
├── middleware/
├── utils/
├── logs/
├── .env.example
└── README.md
```

Thanks for checking out my project! If you have feedback or ideas, I’d love to hear them.
