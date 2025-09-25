# 🎯 Booking API

<div align="center">

**A modern, scalable booking management API built with cutting-edge technologies**

[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748.svg)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-✓-2496ED.svg)](https://docker.com/)

</div>

---

## ✨ Overview

A comprehensive booking management system designed with **Clean Architecture** principles and **Domain-Driven Design (DDD)**. This API provides robust, scalable solutions for managing reservations, users, and services with enterprise-grade architecture.

## 🏗️ Architecture

This project follows **Clean Architecture** (Onion Architecture) with four distinct layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Controllers                              ││
│  │  • HTTP Request/Response handling                      ││
│  │  • Input validation (DTOs)                            ││
│  │  • Error handling                                     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Use Cases                               ││
│  │  • Business logic orchestration                       ││
│  │  • Domain entity creation                             ││
│  │  • Repository coordination                            ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOMAIN LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Entities                                ││
│  │  • Business rules and validations                     ││
│  │  • Domain logic                                       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Repository Implementations              ││
│  │  • Database operations                                ││
│  │  • External service calls                             ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### 🛠️ **Core Technologies**
- ✅ **Node.js 22** - Latest LTS version
- ✅ **NestJS** - Progressive Node.js framework
- ✅ **Prisma ORM** - Next-generation database toolkit
- ✅ **PostgreSQL** - Robust relational database
- ✅ **TypeScript** - Type-safe JavaScript

### 🏛️ **Architecture & Design**
- ✅ **Clean Architecture** - Maintainable and testable code
- ✅ **Domain-Driven Design (DDD)** - Business-focused development
- ✅ **Dependency Injection** - Loose coupling and high cohesion

### 🔧 **Development Tools**
- ✅ **Docker & Docker Compose** - Containerized development
- ✅ **Swagger Documentation** - Interactive API documentation
- ✅ **ESLint & Prettier** - Code quality and formatting
- ✅ **Class-validator & Class-transformer** - Data validation

### 📋 **Booking Features**
- ✅ **User Management** - Complete user lifecycle
- ✅ **Booking System** - Reservation management
- ✅ **Service Integration** - Flexible service booking
- ✅ **Status Tracking** - Real-time booking status

## 📁 Project Structure

```
src/
├── domain/                    # 🏛️ Domain layer
│   ├── entities/             # Business entities
│   │   └── user.entity.ts
│   └── repositories/         # Repository interfaces
│       └── user.repository.interface.ts
├── application/              # 🎯 Application layer
│   ├── use-cases/           # Business use cases
│   │   └── create-user.use-case.ts
│   └── dtos/                # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── user-response.dto.ts
├── infrastructure/           # 🔧 Infrastructure layer
│   ├── database/            # Database configuration
│   │   └── prisma.service.ts
│   ├── repositories/        # Repository implementations
│   │   └── user.repository.ts
│   └── modules/             # Infrastructure modules
│       └── user.module.ts
├── presentation/            # 🌐 Presentation layer
│   └── controllers/         # HTTP controllers
│       └── user.controller.ts
├── app.module.ts           # Main application module
└── main.ts                 # Application bootstrap
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+**
- **Docker & Docker Compose**
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booking-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration if needed
   ```

4. **Start the database with Docker**
   ```bash
   # Using docker compose (newer version)
   docker compose up postgres -d
   
   # Or using docker-compose (older version)
   docker-compose up postgres -d
   ```

5. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

6. **Sync database schema**
   ```bash
   # For development, use db push (faster)
   npm run prisma:db:push
   
   # For production, use migrations
   # npm run prisma:migrate
   ```

7. **Start the application**
   ```bash
   # Development
   npm run start:dev
   
   # Or with Docker
   docker compose up
   ```

## 🐳 Docker

### Development with Docker

```bash
# Start all services
docker-compose up

# Start only database
docker-compose up postgres -d

# Start only application
docker-compose up app
```

### Production with Docker

```bash
# Build and start
docker-compose -f docker-compose.yml up --build
```

## 📚 API Documentation

Once the application is running, you can access:

- **🌐 API Base URL**: `http://localhost:3000/api/v1`
- **📖 Swagger Documentation**: `http://localhost:3000/api/v1/docs`

## 🔧 Available Scripts

### 🚀 **Development**
```bash
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode
```

### 🏗️ **Building**
```bash
npm run build              # Build the application
npm run start:prod         # Start in production mode
```

### 🗄️ **Database**
```bash
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:db:push     # Sync database schema (development)
npm run prisma:studio      # Open Prisma Studio
npm run db:seed            # Seed database with test data
```

### 🎨 **Code Quality**
```bash
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

### 🧪 **Testing**
```bash
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## 📝 Development Guidelines

1. **🏛️ Follow Clean Architecture**: Keep dependencies pointing inward
2. **🎯 Use DDD**: Implement business logic in domain entities
3. **✅ Validate Input**: Use class-validator for DTOs
4. **🧪 Write Tests**: Cover use cases and domain logic
5. **📖 Document APIs**: Use Swagger decorators
6. **🔧 Environment Variables**: Never hardcode configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📚 Documentation

- **[Architecture Flow](docs/ARCHITECTURE_FLOW.md)** - Complete guide to the application architecture and request flow
- **[Request Flow Diagram](docs/REQUEST_FLOW_DIAGRAM.md)** - Visual representation of the request flow through all layers

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ using Clean Architecture and Domain-Driven Design**

[⬆ Back to top](#-booking-api)

</div>