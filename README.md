# 📝 SaaS Notes – Multi-Tenant Full-Stack Application

A production-ready multi-tenant SaaS notes app demonstrating real-world concepts: **multi-tenancy, RBAC, subscriptions, and feature gating**.

**Tech Stack:** Node.js • Express • TypeScript • MongoDB • React • Redux • Tailwind CSS

**Deployment Ready:** ✅ Docker Compose • ✅ GitHub Actions CI/CD • ✅ Docker Hub Images

---

## 🚀 Quick Start

**Option 1: Run with Pre-built Images (Recommended - No Clone Needed)**

```bash
curl -o docker-compose.standalone.yml https://raw.githubusercontent.com/Roshan21p/saas-notes/main/docker-compose.standalone.yml
docker-compose -f docker-compose.standalone.yml up -d
docker-compose -f docker-compose.standalone.yml exec backend npm run seed
# Access at http://localhost:5173
```

> 📌 **Note:** Frontend uses nginx and directly calls the backend without requiring environment variables.

**Option 2: Clone & Build Locally**

```bash
git clone https://github.com/Roshan21p/saas-notes.git
cd saas-notes && docker-compose up --build
docker-compose exec backend npm run seed
```

---

## 🌐 Project Overview

- **Frontend** → React UI with Redux, Tailwind CSS, authentication & tenant management
- **Backend** → Express REST API, JWT auth, multi-tenancy, subscriptions, Nodemailer
- **Database** → MongoDB with Mongoose ORM
- **DevOps** → Docker + Docker Compose + GitHub Actions (auto-build & push to Docker Hub)

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

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **CORS**
- **Nodemailer (Email)**

---

## 🧩 Key Features

- ✅ Multi-tenant architecture (shared database with tenant isolation)
- ✅ Role-based access control (Admin / Member)
- ✅ JWT-based authentication
- ✅ Subscription plans (Free / Pro)
- ✅ Feature gating (note limits)
- ✅ Secure Express middleware setup
- ✅ Seed script for demo tenants and users
- ✅ Clean layered architecture (Controller → Service → Model)

---

## 🏢 Multi-Tenancy Model

- Each **company = Tenant**
- Example tenants:
  - **Acme**
  - **Globex**

- Every user and note belongs to exactly **one tenant**
- Data isolation is enforced using `tenantId`

---

## 👥 Roles & Permissions

| Role   | Permissions                               |
| ------ | ----------------------------------------- |
| Admin  | Invite users, manage tenant, upgrade plan |
| Member | Create, read, update, delete notes        |

---

## 📦 Subscription Plans

| Plan | Note Limit  |
| ---- | ----------- |
| Free | Max 3 notes |
| Pro  | 50          |

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

- User logs in → receives JWT
- JWT contains:
  - `userId`
  - `email`
  - `tenantId`
  - `role`

- `authMiddleware` verifies token
- info is attached to `req.user`

---

## 🌱 Seed Script (Important)

The seed script is **only for development**. It pre-fills the database so you can test the app immediately.

### What it creates

- Tenants:
  - Acme
  - Globex

- Users:
  - `admin@acme.test` (Admin)
  - `user@acme.test` (Member)
  - `admin@globex.test` (Admin)
  - `user@globex.test` (Member)

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

- CORS enabled
- JWT authentication
- Tenant-based data isolation
- Centralized error handling

## 📝 API Endpoints

### Base URL

/api/v1

---

### 1. Authentication Routes (`/api/v1/auth`)

| Method | Endpoint         | Description                  | Auth Required? |
| ------ | ---------------- | ---------------------------- | -------------- |
| POST   | `/login`         | Login user and receive JWT   | No             |
| POST   | `/accept-invite` | Accept invite to join tenant | No             |

---

### 2. Notes Routes (`/api/v1/notes`)

| Method | Endpoint | Description                        | Auth Required? |
| ------ | -------- | ---------------------------------- | -------------- |
| POST   | `/`      | Create a new note                  | Yes            |
| GET    | `/`      | List all notes for current tenant  | Yes            |
| GET    | `/me`    | List notes created by current user | Yes            |
| GET    | `/:id`   | Retrieve a specific note by ID     | Yes            |
| PATCH  | `/:id`   | Update a note by ID                | Yes            |
| DELETE | `/:id`   | Delete a note by ID                | Yes            |

---

### 3. Tenant Routes (`/api/v1/tenants`)

| Method | Endpoint         | Description                      | Auth Required? | Role Required |
| ------ | ---------------- | -------------------------------- | -------------- | ------------- |
| POST   | `/:slug/upgrade` | Upgrade tenant subscription plan | Yes            | Admin only    |
| POST   | `/:slug/invite`  | Invite a new user to tenant      | Yes            | Admin only    |

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

### Start development server

```bash
npm run dev
```

Server will start at:

```
http://localhost:8080
```

### Run seed script (development only)

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

---

## 🐳 Docker Setup

The project includes a complete Docker Compose setup that runs both the backend, frontend, and MongoDB database in isolated containers.

### Prerequisites

- **Docker** ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** ([Install Docker Compose](https://docs.docker.com/compose/install/))

### Quick Start with Docker

1. **Clone the repository:**

```bash
git clone https://github.com/Roshan21p/saas-notes.git
cd saas-notes
```

2. **Create environment files:**

Create `backend/.env`:

```
PORT=8080
MONGO_URI=mongodb://mongo:27017/saas-notes
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

3. **Start all services:**

```bash
docker-compose up --build
```

The `--build` flag rebuilds images on first run. Subsequent runs can use:

```bash
docker-compose up
```

4. **Run seed script (in another terminal):**

After all containers are running and healthy, seed the database:

```bash
docker-compose exec backend npm run seed
```

This creates demo tenants (Acme, Globex) and test users with credentials:

- Email: `admin@acme.test` / Password: `password`
- Email: `user@acme.test` / Password: `password`

5. **Access the application:**

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8080](http://localhost:8080)
- **MongoDB:** Runs internally (not exposed to host)

### Stop Docker Services

```bash
docker-compose down
```

To remove all data (volumes):

```bash
docker-compose down -v
```

### Docker Architecture

**Services:**

- **backend**: Node.js/Express API server (multi-stage build) on port 8080
- **mongo**: MongoDB 7 with persistent volumes and health checks
- **frontend**: React app built with Vite, served via Nginx on port 5173

**Network:**

- Custom bridge network `saas-network` for inter-container communication
- Backend can reach MongoDB as `mongo:27017`
- Frontend can reach Backend as `backend:8080`

### Run Using Pre-built Docker Hub Images (No Clone Needed)

The easiest way! Pull pre-built images directly from Docker Hub:

1. **Create a `docker-compose.yml` file** and paste this content:

```yaml
version: "3.9"

services:
  mongo:
    image: mongo:7
    container_name: saas-mongo
    restart: always
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"
    networks:
      - saas-network

  backend:
    image: roshan21p/saas-notes-backend:latest
    container_name: saas-backend
    restart: always
    depends_on:
      - mongo
    environment:
      - DB_URL=mongodb://mongo:27017/saas
      - PORT=8080
      - JWT_SECRET=saasnotesecret
      - JWT_EXPIRY=7d
      - MAIL_USER=your_email@gmail.com
      - MAIL_PASS=your_app_password
      - FRONTEND_URL=http://localhost:5173
    ports:
      - "8080:8080"
    networks:
      - saas-network

  frontend:
    image: roshan21p/saas-notes-frontend:latest
    container_name: saas-frontend
    restart: always
    depends_on:
      - backend
    ports:
      - "5173:80"
    networks:
      - saas-network

volumes:
  mongo_data:

networks:
  saas-network:
    driver: bridge
```

2. **Run the containers:**

```bash
docker-compose up
```

3. **Run seed script (in another terminal):**

```bash
docker-compose exec backend npm run seed
```

4. **Access the application:**

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8080](http://localhost:8080)

---

### Frontend Environment Variables & Nginx

The frontend is served by **Nginx** inside the container. Here's how it works:

- **At build time**: The frontend is built with `VITE_BACKEND_API_URL=http://localhost:8080/api/v1` embedded
- **The Dockerfile** builds React with Vite, then serves static files via Nginx on port 80 (mapped to 5173 on host)
- **Frontend connects to backend** using the built-in API URL (no runtime env variables needed)

The Nginx configuration serves the React SPA at `http://localhost:5173` and all API calls from the frontend code go to `http://localhost:8080/api/v1`.

> 📌 **Note:** Frontend environment variables are baked into the build at Docker image creation time (by CI pipeline). At runtime, Nginx just serves the static files.

---

## ⚡ GitHub Actions CI/CD

The project uses GitHub Actions to automatically build and push Docker images to Docker Hub whenever code is pushed to the main branch.

### CI Pipeline Overview

**Trigger:** Every push to `main` branch

**Pipeline Stages:**

1. Checkout code
2. Login to Docker Hub
3. Build backend Docker image
4. Push backend image to Docker Hub
5. Build frontend Docker image (with backend API URL)
6. Push frontend image to Docker Hub

### GitHub Actions Workflow File

The workflow is defined in `.github/workflows/ci-pipeline.yml`:

```yaml
name: Build and Push Frontend & Backend Docker Images

on:
  push:
    branches: ["main"]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # Build and push Backend Docker image
      - name: Build Backend Image
        run: |
          docker build \
            -t ${{ secrets.DOCKER_USERNAME }}/saas-notes-backend:latest \
            -f backend/Dockerfile ./backend

      - name: Push Backend Image
        run: |
          docker push ${{ secrets.DOCKER_USERNAME }}/saas-notes-backend:latest

      # Build and push Frontend Docker image (with backend URL at build time)
      - name: Build Frontend Image
        run: |
          docker build \
             --no-cache \
             -t ${{ secrets.DOCKER_USERNAME }}/saas-notes-frontend:latest \
             --build-arg VITE_BACKEND_API_URL=http://localhost:8080/api/v1 \
             -f frontend/Dockerfile ./frontend

      - name: Push Frontend Image
        run: |
          docker push ${{ secrets.DOCKER_USERNAME }}/saas-notes-frontend:latest
```

### Setting Up CI/CD

1. **Create Docker Hub account** (if you don't have one):
   - Go to [Docker Hub](https://hub.docker.com/)
   - Create a free account

2. **Generate Docker Hub access token**:
   - Go to Account Settings → Security → New Access Token
   - Give it read/write permissions
   - Copy the token

3. **Add GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `DOCKER_USERNAME`: Your Docker Hub username
     - `DOCKER_PASSWORD`: Your Docker Hub access token (NOT your password)

4. **How it works**:
   - Every time you push to `main` branch, the workflow runs automatically
   - Both backend and frontend images are built using multi-stage Dockerfile for optimization
   - Images are pushed to Docker Hub as `<username>/saas-notes-backend:latest` and `<username>/saas-notes-frontend:latest`
   - You can then pull and run these images anywhere

### Using Published Images

After the CI pipeline pushes images, you can run them from Docker Hub:

```bash
# Create a new docker-compose.yml using published images
docker pull <username>/saas-notes-backend:latest
docker pull <username>/saas-notes-frontend:latest

# Run with docker-compose
docker-compose up
```

### Monitoring Workflows

- Go to your GitHub repository → Actions tab
- Click on any workflow run to see detailed logs
- Check if images were successfully pushed to Docker Hub

> 📌 **Note:** The frontend image is built with `--no-cache` and includes the `VITE_BACKEND_API_URL` build argument, which is set at build time.

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
