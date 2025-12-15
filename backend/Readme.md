# 📝 SaaS Notes Backend (Multi-Tenant)

This repository contains the **backend service** for a **Multi-Tenant SaaS Notes Application** built using **Node.js, Express, TypeScript, and MongoDB**. It follows a clean, scalable architecture suitable for real-world SaaS products.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **Helmet & CORS**
* **Nodemailer (Email)**

---

## 🧩 Key Features

* ✅ Multi-tenant architecture (shared database with tenant isolation)
* ✅ Role-based access control (Admin / Member)
* ✅ JWT-based authentication
* ✅ Subscription plans (Free / Pro)
* ✅ Feature gating (note limits)
* ✅ Secure Express middleware setup
* ✅ Seed script for demo tenants and users
* ✅ Clean layered architecture (Controller → Service → Model)

---

## 🏢 Multi-Tenancy Model

* Each **company = Tenant**
* Example tenants:

  * **Acme**
  * **Globex**
* Every user and note belongs to exactly **one tenant**
* Data isolation is enforced using `tenantId`

---

## 👥 Roles & Permissions

| Role   | Permissions                               |
| ------ | ----------------------------------------- |
| Admin  | Invite users, manage tenant, upgrade plan |
| Member | Create, read, update, delete notes        |

---

## 📦 Subscription Plans

| Plan | Note Limit      |
| ---- | --------------- |
| Free | Max 3 notes     |
| Pro  | 50 |

---

## 🗂️ Project Structure

```
backend/
│── src/
│   ├── config/
│   │   ├── dbConfig.ts
│   │   ├── mailConfig.ts
│   │   └── serverConfig.ts
│
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── noteController.ts
│   │   └── tenantController.ts
│
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│
│   ├── models/
│   │   ├── note.ts
│   │   ├── tenant.ts
│   │   └── user.ts
│
│   ├── routes/
│   │   └── v1/
│   │       ├── authRoute.ts
│   │       ├── noteRoutes.ts
│   │       ├── tenantRoutes.ts
│   │       └── v1Router.ts
│   │
│   ├── apiRoutes.ts
│
│   ├── script/
│   │   └── seed.ts   // Creates Acme + Globex + Users
│
│   ├── services/
│   │   ├── authService.ts
│   │   ├── noteService.ts
│   │   └── tenantService.ts
│
│   ├── types/
│   │   └── express.d.ts
│
│   ├── utils/
│   │   ├── AppError.ts
│   │   ├── authUtils.ts
│   │   ├── mailObject.ts
│   │   └── verifyToken.ts
│
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## 🔐 Authentication Flow

* User logs in → receives JWT
* JWT contains:

  * `userId`
  * `email`
  * `tenantId`
  * `role`
* `authMiddleware` verifies token
*  info is attached to `req.user`

---

## 🌱 Seed Script (Important)

The seed script is **only for development**. It pre-fills the database so you can test the app immediately.

### What it creates

* Tenants:

  * Acme
  * Globex
* Users:

  * `admin@acme.test` (Admin)
  * `user@acme.test` (Member)
  * `admin@globex.test` (Admin)
  * `user@globex.test` (Member)

**Password for all users:**

```
password
```

### Run seed script

```bash
npm run seed
```

⚠️ **Do not run seed in production**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/saas-notes
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=your_jwt_expiry
MAIL_USER=your_email
MAIL_PASS=your_password
FRONTEND_URL=your_frontend_url
```

---

## 🛡️ Security

* CORS enabled
* JWT authentication
* Tenant-based data isolation
* Centralized error handling

## 📝 API Endpoints

### Base URL
/api/v1


---

### 1. Authentication Routes (`/api/v1/auth`)

| Method | Endpoint           | Description                 | Auth Required? |
|--------|--------------------|-----------------------------|---------------|
| POST   | `/login`           | Login user and receive JWT   | No            |
| POST   | `/accept-invite`   | Accept invite to join tenant | No            |

---

### 2. Notes Routes (`/api/v1/notes`)

| Method | Endpoint         | Description                              | Auth Required? |
|--------|------------------|------------------------------------------|---------------|
| POST   | `/`              | Create a new note                        | Yes           |
| GET    | `/`              | List all notes for current tenant       | Yes           |
| GET    | `/me`            | List notes created by current user      | Yes           |
| GET    | `/:id`           | Retrieve a specific note by ID           | Yes           |
| PATCH  | `/:id`           | Update a note by ID                      | Yes           |
| DELETE | `/:id`           | Delete a note by ID                      | Yes           |

---

### 3. Tenant Routes (`/api/v1/tenants`)

| Method | Endpoint              | Description                             | Auth Required? | Role Required |
|--------|-----------------------|-----------------------------------------|---------------|---------------|
| POST   | `/:slug/upgrade`      | Upgrade tenant subscription plan        | Yes           | Admin only    |
| POST   | `/:slug/invite`       | Invite a new user to tenant              | Yes           | Admin only    |


---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Roshan21p/saas-notes.git
cd saas-notes-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run seed script (development only)

```bash
npm run seed
```

### 4️⃣ Start development server

```bash
npm run dev
```

Server will start at:

```
http://localhost:8080
```

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 🩺 Ping Check

```http
GET /ping
```

Response:

```json
{ "status": "Pong" }
```



---


