# Scalable REST API with React Frontend

This project implements a scalable REST API using Node.js, Express, PostgreSQL, and Prisma ORM, alongside a React frontend built with Vite and Tailwind CSS. It features secure JWT Authentication, Role-Based Access Control (RBAC), and full CRUD functionality for Tasks.

## Tech Stack
**Backend**: Node.js, Express.js, PostgreSQL, Prisma ORM, JWT, bcrypt, Zod, Swagger
**Frontend**: React.js (Vite), Axios, React Router, Tailwind CSS, Lucide React
**DevOps**: Docker, Docker Compose, Redis (Optional/Prepared)

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

## Final Notes
- Admin Accounts can be created by sending `role: "admin"` during Registration either via Swagger or by modifying the React `Register.jsx` codebase temporarily.
