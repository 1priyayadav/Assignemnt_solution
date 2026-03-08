# Scalable REST API with React Frontend

This project implements a scalable REST API using Node.js, Express, PostgreSQL (via Supabase), and Prisma ORM, alongside a React frontend built with Vite and Tailwind CSS. It features secure JWT Authentication, Role-Based Access Control (RBAC), and full CRUD functionality for Tasks.

## 🚀 Live Deployment Links
- **Frontend Dashboard:** [https://assignemnt-solution.vercel.app]
- **Backend API:** [https://assignemnt-solution-1.onrender.com/]
- **Interactive API Docs (Swagger):**[https://assignemnt-solution-1.onrender.com/api-docs/#/]
---

## 🏗️ Project Overview & Architecture
### Backend (Core Features)
- **Authentication:** Secure Registration and Login with bcrypt password hashing and stateless JWT token handling.
- **Role-Based Access Control (RBAC):** Users are assigned `user` or `admin` roles. Enforced on task CRUD operations—admins manage all tasks, users manage only their own.
- **RESTful Principles:** Strict route controller middleware service pattern with clear HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`, `500`).
- **Validation:** Request bodies (register/login/task fields) are strictly validated using `Zod` prior to database execution.

### Database (PostgreSQL via Supabase)
The database schema utilizes a clear One-to-Many relational model handled via Prisma ORM:
- **`User` Table:** Stores authentication data and roles.
- **`Task` Table:** Stores CRUD entity data. Contains a `createdBy` foreign key relating directly to the `User` ID.

### Frontend (UI Verification)
The React application explicitly demonstrates:
- User Registration & Login forms.
- A Protected Dashboard guarded by JWT presence in localStorage.
- Full UI capabilities for Creating, Reading, Updating, and Deleting tasks.
- Immediate `react-hot-toast` visual feedback showing success/error messages directly parsed from the API response status codes.

---

## 📈 Scalability Note (Required Deliverable)
This application is designed specifically with horizontal scaling in mind:
- **Stateless Authentication:** Because JWT tokens are signed without storing sessions in server memory, any number of instances behind a load balancer can verify requests.
- **Caching Layer Prepared:** A Redis container is wired up in the local `docker-compose.yml`. In a production microservice architecture, this Redis layer would handle rate-limiting and query caching before hitting the main Postgres nodes.
- **Dockerization:** The backend is fully containerized, meaning it is Kubernetes/ECS ready.
- **Separation of Concerns:** Future module additions (e.g., Notes, Products) can be slotted directly into new isolated Route/Controller/Validation files without interfering with existing business logic.

---

## ⚙️ Installation & Setup (Local Development)

### 1. Environment Variables
To run this locally, create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
JWT_SECRET="super-secret-key-change-in-production"
NODE_ENV="development"
```

And a `.env` file inside the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 2. Backend Setup
1. Open a terminal in the `backend` directory.
2. Install dependencies: `npm install`
3. Generate Prisma Client & Push Schema: `npm run build`
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Open a terminal in the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

---

## 📡 API Endpoint List
*(Full interactive testing available at `/api-docs` via Swagger)*

### Auth Endpoints
- `POST /api/v1/auth/register` - Create user
- `POST /api/v1/auth/login` - Authenticate & receive JWT

### Task Endpoints (JWT Required)
- `GET /api/v1/tasks` - List tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/:id` - Get specific task details
- `PUT /api/v1/tasks/:id` - Modify task
- `DELETE /api/v1/tasks/:id` - Delete task

*Note: Admin Accounts can be created by sending `role: "admin"` during Registration either via Swagger or by modifying the React `Register.jsx` codebase temporarily.*


## Features
- **Authentication**: Secure Registration and Login with bcrypt hashing and JWT.
- **RBAC**: `user` and `admin` roles. Admins can view/manage all tasks; users manage only their own.
- **CRUD Entities**: Create, Read, Update, Delete for Tasks.
- **Validation & Error Handling**: Request bodies are validated using Zod. Centralized Express error handler.
- **API Documentation**: Interactive Swagger UI available at `/api-docs`.
- **Dynamic Frontend**: Modern UI with protected routes, forms, and responsive task lists.

## Scalability Explanation
- **Separation of Concerns**: The backend strictly follows the Route-Controller-Middleware-Service pattern.
- **Stateless Authentication**: JWT makes horizontally scaling simple without centralized session storage.
- **Database Architecture**: PostgreSQL combined with Prisma ensures type-safe and efficient database queries. A Redis container is wired in `docker-compose.yml` for future caching layers.

---

## Installation & Setup

### 1. Running with Docker (Recommended)
You can bring up the entire stack, including PostgreSQL, Redis, Backend, and Frontend without installing Node.js locally.

```bash
docker-compose build
docker-compose up -d
```
- **Backend API Setup**: Since Prisma migrations need to run on a fresh DB, the Docker compose file automatically executes `npx prisma migrate dev --name init` on DB startup.
- The UI will be available at `http://localhost:5173`
- The API will be available at `http://localhost:5000/api/v1`
- Swagger Docs at `http://localhost:5000/api-docs`

### 2. Running Locally (Manual Setup)

#### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally.

#### Backend
1. Open terminal in the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   > Edit `.env` to make sure your `DATABASE_URL` matches your local Postgres credentials.
4. Run migrations to create tables:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the API:
   ```bash
   npm run dev
   ```

#### Frontend
1. Open another terminal in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add a `.env` file in the frontend root:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```
4. Start the Vite server:
   ```bash
   npm run dev
   ```



