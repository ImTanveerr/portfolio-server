#  Portfolio Website – Backend (Express.js + Prisma + PostgreSQL)

This is the **backend** service for my portfolio website, built using **Express.js**, **Prisma ORM**, and **PostgreSQL**.  
It handles all **API endpoints**, **authentication**, **authorization**, and **data management** for blogs, projects, and admin access.

---

## Features

###  Authentication & Authorization
- **JWT-based Authentication** (stateless)
- **bcrypt** password hashing for secure credential storage
- **Seeded Admin User** for portfolio owner
- **Role-based Access Control** (admin only can manage content)

### Blog Management
- Full CRUD operations for blogs (Create, Read, Update, Delete)
- Public GET routes for all and single blog
- Private  routes (Admin only)

### Project Management
- Full CRUD for personal projects
- Public route for fetching project list and details

###  About Section
- Static route for personal information (name, bio, contact, skills)

### Error Handling
- Global error handler with meaningful messages
- Token validation for protected routes
- Schema validation (e.g., Zod or manual validation)

## Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js / Express.js** | Backend framework |
| **Prisma ORM** | Database ORM for PostgreSQL |
| **PostgreSQL** | Relational database |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Secure password hashing |
| **dotenv** | Environment variables |
| **CORS & Helmet** | Security middleware |

---

