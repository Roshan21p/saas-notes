# 📝 SaaS Notes – Multi-Tenant Full-Stack Application

A full-stack multi-tenant SaaS notes application built with Node.js, Express, TypeScript, MongoDB, and React.

The project demonstrates real-world SaaS concepts such as multi-tenancy, role-based access control, subscription plans, and feature gating, following a clean and scalable architecture.

---

## 🌐 Project Overview

This repository contains:

- **Frontend** → User interface for authentication, notes, and tenant management  
- **Backend** → REST API, authentication, multi-tenancy, subscriptions  

Both parts are designed to work together as a real SaaS product.

---
## 🌐 Live Demo & API

Try the application live:

- **Frontend (User Interface):** [https://saas-notes-beta.vercel.app](https://saas-notes-beta.vercel.app)  
- **Backend API:** [https://saas-notes-nk3l.onrender.com](https://saas-notes-nk3l.onrender.com)

> ⚠️ The backend is hosted on Render and may take a few seconds to start if idle.
---

## 🚀 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- State management using **Redux ToolKit**
- **Axios**
- **JWT-based Auth Flow**

### Backend
* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **CORS**
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
│   │   |    ├── authRoute.ts
│   │   |    ├── noteRoutes.ts
│   │   |    ├── tenantRoutes.ts
│   │   |    └── v1Router.ts
│   │   |
│       ├── apiRoutes.ts
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

### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/saas-notes.git
cd saas-notes
```

## 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Frontend runs at:
```
http://localhost:5173
```

## 3. Backend Setup

```bash
cd backend
npm install
```

###  Start development server

```bash
npm run dev
```

Server will start at:

```
http://localhost:8080
```

###  Run seed script (development only)

```bash
npm run seed
```

---

## ⚙️ Environment Variables 

## Create a `.env` file in the root directory:

### Frontend .env
```
  VITE_BACKEND_API_URL="http://localhost:8080/api/v1"
```

### Backend .env
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

## 🩺 Ping Check

```http
GET /ping
```

Response:

```json
{ "status": "Pong" }
```
---

## 📸 Screenshots

### Landing_Page
<img width="1883" height="906" alt="Home1" src="https://github.com/user-attachments/assets/73ad51f6-00bc-4fa5-844f-de3d0008dcb0" />

<img width="1900" height="898" alt="Home2" src="https://github.com/user-attachments/assets/332f161a-2667-4979-b5ba-4369f4aa45fc" />

### Login_Page

<img width="1516" height="912" alt="login" src="https://github.com/user-attachments/assets/dd8faf13-2f84-44d8-a045-97f11074f59e" />

### Create_Note

<img width="1483" height="903" alt="CreateNote" src="https://github.com/user-attachments/assets/d8148929-e562-4231-bdec-7e97333feb61" />

### Edit_Note

<img width="1492" height="905" alt="EditNote" src="https://github.com/user-attachments/assets/b91d27d3-8a93-4e0e-ac0b-ed77a53bcf15" />

### Delete_Note

<img width="1663" height="665" alt="Delete" src="https://github.com/user-attachments/assets/8335c761-18fc-4ce4-8652-060355e7939d" />

### MyNotes

<img width="1598" height="903" alt="AllmyNotes" src="https://github.com/user-attachments/assets/283500b2-8c46-445c-8b66-71fc27d000c7" />

## Admin Section

### Upgrade_Plan
<img width="1762" height="905" alt="upgradePlan" src="https://github.com/user-attachments/assets/6b58a038-9751-489f-a90e-52dababbd237" />

### Invite_User
<img width="1520" height="905" alt="inviteUser" src="https://github.com/user-attachments/assets/109aa336-3c50-42da-ac53-697af875a511" />

## Member Section
### Accept_Invite
<img width="1643" height="910" alt="accept-invite" src="https://github.com/user-attachments/assets/9d7129fa-03be-43d8-963c-6ca2e88cb4d5" />

