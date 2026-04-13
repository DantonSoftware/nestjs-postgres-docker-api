# NestJS PostgreSQL Docker API

![NestJS](https://img.shields.io/badge/NestJS-Framework-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-FE0803)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger&logoColor=black)

Backend API built with **NestJS**, **PostgreSQL**, **TypeORM**, and **Docker**.  
This project includes **JWT authentication**, **role-based authorization**, **ownership validation**, **pagination**, **Swagger documentation**, and **database migrations**.

---

## Features

- NestJS REST API
- PostgreSQL with Docker
- TypeORM integration
- Database migrations
- JWT authentication
- Role-based authorization (`admin` / `user`)
- Ownership-based authorization for posts
- User status management (`active` / `inactive`)
- Pagination and filters
- Swagger API documentation
- Input validation with DTOs

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- JWT
- Swagger
- class-validator
- class-transformer

---

## Project Structure

```bash
src
├── common
│   ├── decorators
│   ├── enums
│   ├── guards
│   └── interfaces
├── config
├── modules
│   ├── auth
│   ├── health
│   ├── posts
│   └── users
└── main.ts

database
└── migrations

Main Modules
Auth
Login with JWT
Protected routes
Current authenticated user profile
Users
Create users
Update users
Paginated user listing
Filter by name and email
Role-based access
Active / inactive user management
Posts
Create posts linked to the authenticated user
Paginated post listing
Filter by title
Ownership validation for update and delete
Soft delete support
Health
Health check endpoint
Authentication

This API uses JWT Bearer Token authentication.

Login
POST /api/v1/auth/login

Example body:

{
  "email": "admin@test.com",
  "password": "123456"
}
Authorization

This project includes two authorization strategies:

1. Role-based authorization

Used for endpoints restricted to specific roles such as admin.

2. Ownership-based authorization

Used for post update and delete operations so that only the owner can modify their own posts.

API Documentation

Swagger is available at:

http://localhost:3000/docs
Environment Variables

Create a .env file in the project root:

PORT=3000

DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestdb

JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=1h
Running PostgreSQL with Docker
docker compose up -d
Installation
npm install
Run the Project
Development
npm run start:dev
Production build
npm run build
npm run start:prod
Migrations
Generate migration
npm run migration:generate
Run migrations
npm run migration:run
Revert last migration
npm run migration:revert
Example Endpoints
Users
GET /api/v1/users
GET /api/v1/users/:id
POST /api/v1/users
PATCH /api/v1/users/:id
PATCH /api/v1/users/:id/status
DELETE /api/v1/users/:id
Auth
POST /api/v1/auth/login
GET /api/v1/auth/profile
Posts
GET /api/v1/posts
POST /api/v1/posts
PATCH /api/v1/posts/:id
DELETE /api/v1/posts/:id
Health
GET /health
Pagination Examples
Users
GET /api/v1/users?page=1&limit=10
GET /api/v1/users?page=1&limit=10&name=carlos
GET /api/v1/users?page=1&limit=10&email=test.com
Posts
GET /api/v1/posts?page=1&limit=10
GET /api/v1/posts?page=1&limit=10&title=nest
User Status Management

Users can be enabled or disabled through the status endpoint:

PATCH /api/v1/users/:id/status

Example body:

{
  "isActive": false
}

Inactive users cannot log in.

Future Improvements
Refresh tokens
E2E tests
Unit tests
Role entity with dynamic permissions
File uploads
CI/CD pipeline
Author

Developed by DantonSoftware


Después de pegarlo:

```bash
git add README.md
git commit -m "docs: improve project README"
git push
```md

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
