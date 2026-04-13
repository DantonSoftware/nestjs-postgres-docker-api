# NestJS PostgreSQL Docker API

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
