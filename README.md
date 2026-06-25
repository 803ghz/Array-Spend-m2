<img width="1408" height="768" alt="arrayspendlogo" src="https://github.com/user-attachments/assets/9149b0e3-3df5-4c7f-bbcc-c136cb666cbc" />

# ArraySpend — Monthly Expense Tracker API

This project consists of a REST API for managing personal monthly expenses with user authentication. Each user registers, logs in, and manages **only their own expenses**, organized by category. Built with Node.js, Express, and MongoDB following an MVC architecture.

![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## Contents Index

- [Features](#-features)
- [Tech stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation and setup](#-installation-and-setup)
- [Environment variables](#-environment-variables)
- [Available scripts](#-available-scripts)
- [Project structure](#-project-structure)
- [Data models](#-data-models)
- [Authentication](#-authentication)
- [API documentation](#-api-documentation)
- [Error handling](#-error-handling)
- [Testing](#-testing)
- [License](#-license)

---

## Features

- **User registration and login** with encrypted passwords (bcrypt).
- **JWT authentication**: login returns a token that protects private routes.
- **Per-user isolation**: each user can only view and modify their own expenses.
- **Full CRUD** for expenses (create, list, view, update, delete).
- **Category organization** to make tracking monthly spending easier.
- **Input validation** with express-validator before touching the database.
- **Data sanitization** with sanitize-html to prevent malicious HTML/JS injection.
- **Request rate limiting** with express-rate-limit.
- **CORS enabled** to connect with the frontend.
- **MVC architecture** with separated layers (models, controllers, routes, middlewares).
- **Automated tests** with Vitest (including coverage via Istanbul).

---

## Tech stack

| Tool                    | Purpose                                            |
| ----------------------- | --------------------------------------------------- |
| **Node.js**             | JavaScript runtime environment on the server       |
| **Express**             | Routing and middleware framework                   |
| **MongoDB + Mongoose**  | Document database and data modeling                |
| **bcrypt**              | Password hashing/encryption                        |
| **jsonwebtoken**        | JWT token signing and verification                 |
| **express-validator**   | Input data validation                              |
| **sanitize-html**       | Cleans text fields to prevent malicious HTML/JS    |
| **express-rate-limit**  | Limits the number of requests per IP                |
| **cors**                | Enables requests from the frontend                 |
| **dotenv**              | Loads environment variables from `.env`            |
| **Vitest**              | Testing framework                                  |

---

## Prerequisites

Before you start, make sure you have installed:

- [Node.js v24.15.0](https://nodejs.org/) **if possible use v18 or higher** (`node --version`)
- [MongoDB](https://www.mongodb.com/) locally **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) account.
- A client to test the API: [Thunder Client](https://www.thunderclient.com/), or Postman.

---

## Installation and setup

```bash
# 1. Clone the repository
git clone https://github.com/803ghz/Array-Spend-m2.git
cd Array-Spend-m2

# 2. Install dependencies
npm install

# 3. Create your environment variables file from the example
cp .env.example .env
#    ...then edit .env with your values (especially MONGODB_URI and JWT_SECRET !!! )

# 4. Start the server in development mode
npm run dev
```

If everything works, you'll see something like this in the terminal:

```
Conectado a MongoDB
Servidor funcionando en puerto "PORT"
```
---

## Environment variables

The project **won't run without a `.env` file**. Never commit this file to the repository (it's in `.gitignore`). Instead, an **`.env.example`** is versioned with the keys but without the secret values, so anyone knows what they need to fill in.

```bash
# THIS IS AN EXAMPLE.
PORT=2001
MONGODB_URI=mongodb://localhost:2001/array-spend
JWT_SECRET=change_this_to_a_long_random_very_very_very_secret_string
JWT_EXPIRES_IN=7d
```

| Variable          | Description                                         | Example                                  |
| ----------------- | ----------------------------------------------------- | ------------------------------------------ |
| `PORT`            | Port the server listens on                          | `3000`, `2001`...                                    |
| `MONGODB_URI`     | MongoDB connection string                          | `mongodb://localhost:27017/array-spend`   |
| `JWT_SECRET`      | Secret key used to sign tokens (keep it private!)  | `aB3$...`                                  |
| `JWT_EXPIRES_IN`  | Token expiration time                              | `7d`, `24h`...                       |

---

## Available scripts

| Command             | What it does                                                  |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Starts the server with auto-reload if anything changes (`nodemon index.js`)        |
| `npm start`         | Starts the server in production mode (`node index.js`)        |
| `npm test`          | Runs all tests with Vitest                                     |
| `npm run coverage`  | Runs the tests and generates a coverage report (Istanbul)     |

---

## Project structure

```
Array-Spend-m2/
├── src/
│   ├── config/
│   │   └── db.js                 # Configures the connection to the MongoDB database
│   ├── controllers/
│   │   ├── gastos.controller.js  # Logic for handling Expense CRUD operations
│   │   └── users.controller.js   # Logic for User registration, login, and profile management
│   ├── middlewares/
│   │   ├── loginRules.js         # Validation rules for user login attempts
│   │   ├── password.js           # Password hashing or complexity logic
│   │   ├── rateLimit.js          # Prevents brute-force by limiting request frequency
│   │   ├── registerRules.js      # Validation rules for new user registration
│   │   ├── validate.js           # General handler to collect express-validator errors
│   │   └── verifyToken.js        # JWT middleware to protect private routes
│   ├── models/
│   │   ├── gastos.models.js      # Mongoose schema definition for Expenses
│   │   └── users.models.js       # Mongoose schema definition for Users
│   ├── routes/
│   │   ├── gastos.routes.js      # Router definitions for expense-related endpoints
│   │   └── users.routes.js       # Router definitions for users and profile endpoints
│   ├── utils/
│   │   └── sanitizer.js          # Logic to clean/sanitize user input to prevent XSS/injection
│   └── app.js                    # Express application configuration and middleware setup
├── tests/ (Implied/References)
│   ├── password.test.js          # Unit tests for password logic
│   ├── user.test.js              # Unit tests for user authentication
│   └── validate.test.js          # Unit tests for validation middleware
│   └── verifyToken.test.js       # Unit tests for token verification
├── .env                          # Environment variables (DB URI, JWT Secret, etc.)
├── .gitignore                    # Files and folders to ignore in Git
├── gastos.json                   # Mock/Seed data for testing expenses
├── index.js                      # Entry point: initializes DB connection and starts the server
├── package.json                  # Dependencies and project scripts
├── README.md                     # Project documentation
└── vitest.config.js              # Configuration file for Vitest testing suite
```

---

## Data models

### User

| Field       | Type     | Rules                                        |
| ----------- | -------- | ---------------------------------------------- |
| `nombre`    | String   | Required                                      |
| `email`     | String   | Required, unique, valid email format          |
| `password`  | String   | Required, stored **encrypted** (bcrypt)       |
| `createdAt` | Date     | Automatic (timestamps)                        |
| `updatedAt` | Date     | Automatic (timestamps)                        |

> The `password` field is **never** returned in responses. The model transforms its JSON output to remove `password` and `__v`, and rename `_id` to `id`.

### Expense

| Field         | Type               | Rules                                      |
| ------------- | -------------------| ---------------------------------------------|
| `concepto`    | String             | Required                                     |
| `cantidad`    | Number             | Required, greater than 0                     |
| `categoria`   | String             | Required (e.g. food, transport, leisure...)  |
| `lista`       | List               | Required (It create a list of expenses)      |
| `usuario`     | ObjectId (ref)     | Owner of the expense (set automatically)     |
| `createdAt`   | Date               | Automatic (timestamps)                       |
| `updatedAt`   | Date               | Automatic (timestamps)                       |

---

## Authentication

Especific routes require a **JWT token**. The flow is:

1. You **register** (`POST /api/users/register`) or **log in** (`POST /api/users/login`).
2. The response includes a `token`.
3. On every request to a protected route, send that token in the header:

```http
Authorization: Bearer <your_token>
```

If the token is missing, expired, or invalid, the API responds with `401 Unauthorized`.

---

## API documentation

**Base URL:** `http://localhost:2001/api`

### Endpoint summary

| Method   | Endpoint          | Auth | Description                       |
| -------- | ------------------ | :--: | ------------------------------------ |
| `GET`    | `/health`          |  —   | Checks that the server is responding |
| `POST`   | `/users/register`  |  —   | Registers a new user                |
| `POST`   | `/users/login`     |  —   | Logs in and returns a token         |
| `GET`    | `/users/profile`   |  🔒  | Authenticated user's data           |
| `GET`    | `/gastos`          |  🔒  | Lists the user's expenses           |
| `GET`    | `/gastos/:id`      |  🔒  | Gets an expense by its id           |
| `POST`   | `/gastos`          |  🔒  | Creates an expense                  |
| `PUT`    | `/gastos/:id`      |  🔒  | Updates an expense                  |
| `DELETE` | `/gastos/:id`      |  🔒  | Deletes an expense                  |

---

### `POST /api/users/register`

Registers a new user.

**Response `201 Created`** — user id and email.

**Possible error:** `409` (email already registered), `500`.

---

### `POST /api/users/login`

Authenticates user and returns a JWT.

**Response `200 OK`** — token.

**Possible error:** `401` (incorrect credentials), `500`.

---

### `GET /api/user/profile`

Retrieves current user profile.

**Response `200 OK`** — user profile data.

**Possible error:** `401` (token missing or invalid).

---

## Expenses & Lists Endpoints

### `GET /api/listas`

Retrieves all lists belonging to the user.

**Response `200 OK`** — array of lists.

**Possible error:** `401`.

---

### `POST /api/listas`

Creates a new list for the authenticated user.

**Response `201 Created`** — message and the created list.

**Possible error:** `400` (missing fields), `401`.

---

### `DELETE /api/listas/:listaId`

Deletes a specific list and its contents.

**Response `200 OK`** — success message.

**Possible error:** `403` (not your list), `404` (doesn't exist), `401`.

---

### `GET /api/listas/:listaId/gastos`

Lists all expenses of a specific list.

**Response `200 OK`** — array of expenses.

**Possible error:** `403` (not your list), `404`, `401`.

---

### `POST /api/listas/:listaId/gastos`

Adds a new expense to a specific list.

**Response `201 Created`** — created expense.

**Possible error:** `400` (missing/invalid fields), `403`, `404`, `401`.

---

### `PUT /api/listas/:listaId/gastos/:gastoId`

Updates an existing expense.

**Response `200 OK`** — the updated expense.

**Possible error:** `403` (not your list/gasto), `404`, `401`.

---

### `DELETE /api/listas/:listaId/gastos/:gastoId`

Deletes a specific expense.

**Response `200 OK`** — success message.

**Possible error:** `403` (not your list/gasto), `404`, `401`.

---

## Error handling

All errors return JSON with the **same shape**, so the frontend always knows where to look:

```json
{
  "mensaje": "Human-readable error description"
}
```

When the failure is a **validation error**, field-by-field details are added:

```json
{
  "mensaje": "Invalid data",
  "errores": [
    { "campo": "email", "error": "Must be a valid email" },
    { "campo": "cantidad", "error": "Must be a number greater than 0" }
  ]
}
```

### Status codes used

| Code  | Meaning                | When                                              |
| ------ | ----------------------- | --------------------------------------------------- |
| `200`  | OK                     | Successful request with a response body            |
| `201`  | Created                | A resource was created (registration, new expense) |
| `403`  | Forbidden              | A succesful request but lack of authorization      |
| `404`  | Not Found              | Resource doesn't exist (or doesn't belong to the user) |
| `409`  | Conflict               | Conflict, e.g. email already registered             |
| `500`  | Internal Server Error  | Unexpected server error                             |

---

## Testing

```bash
npm run test
```

To generate a coverage report:

```bash
npm run coverage
```

The project includes:

- **Unit tests** for pure functions (validators, helpers): input → output, no database.
- **Integration tests** for endpoints: spin up the app and check the full route → controller → model flow.

> Tests use a **separate** (or in-memory) database so your real data isn't touched.

---

## License

Distributed under the ISC license. See the `LICENSE` file for more details.
