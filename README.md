# Booking API - NestJS + Prisma + PostgreSQL

A comprehensive booking management API built with Node.js 22, NestJS, Prisma, and PostgreSQL using clean architecture principles and Domain-Driven Design (DDD).

## 🏗️ Architecture

This project follows **Clean Architecture** (Onion Architecture) with the following layers:

- **Domain Layer**: Contains business entities, value objects, and repository interfaces
- **Application Layer**: Contains use cases, DTOs, and application interfaces
- **Infrastructure Layer**: Contains database implementations, external services
- **Presentation Layer**: Contains controllers, guards, and interceptors

## 🚀 Features

- ✅ Node.js 22
- ✅ NestJS framework
- ✅ Prisma ORM
- ✅ PostgreSQL database
- ✅ Docker & Docker Compose
- ✅ Clean Architecture
- ✅ Domain-Driven Design (DDD)
- ✅ Class-validator & Class-transformer
- ✅ Swagger documentation
- ✅ Environment variables configuration
- ✅ TypeScript
- ✅ ESLint & Prettier
- ✅ Booking management system
- ✅ Reservation tracking
- ✅ User management

## 📁 Project Structure

```
src/
├── domain/                    # Domain layer
│   ├── entities/             # Business entities
│   │   └── user.entity.ts
│   └── repositories/         # Repository interfaces
│       └── user.repository.interface.ts
├── application/              # Application layer
│   ├── use-cases/           # Business use cases
│   │   └── create-user.use-case.ts
│   └── dtos/                # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── user-response.dto.ts
├── infrastructure/           # Infrastructure layer
│   ├── database/            # Database configuration
│   │   └── prisma.service.ts
│   ├── repositories/        # Repository implementations
│   │   └── user.repository.ts
│   └── modules/             # Infrastructure modules
│       └── user.module.ts
├── presentation/            # Presentation layer
│   └── controllers/         # HTTP controllers
│       └── user.controller.ts
├── app.module.ts           # Main application module
└── main.ts                 # Application bootstrap
```

## 🛠️ Setup

### Prerequisites

- Node.js 22
- Docker & Docker Compose
- npm or yarn

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

7. **Seed the database with test data (optional)**
   ```bash
   npm run db:seed
   ```

8. **Start the application**
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

- **API Base URL**: `http://localhost:3000/api/v1`
- **Swagger Documentation**: `http://localhost:3000/api/v1/docs`

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Building
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:db:push     # Sync database schema (development)
npm run prisma:studio      # Open Prisma Studio
npm run db:seed            # Seed database with test data

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

## 🌱 Database Seeding

The project includes a seeder that populates the database with test users for development and testing purposes. The seeder uses Prisma's `createMany` for efficient bulk insertion.

### Available Seed Data

The seeder creates 8 sample users:
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)
- Bob Wilson (bob.wilson@example.com)
- Alice Johnson (alice.johnson@example.com)
- Charlie Brown (charlie.brown@example.com)
- Diana Prince (diana.prince@example.com)
- Bruce Wayne (bruce.wayne@example.com)
- Clark Kent (clark.kent@example.com)

### Running the Seeder

```bash
# Seed the database with test data
npm run db:seed

# Or using the direct Prisma command
npm run prisma:seed
```

**Note:** The seeder will clear all existing users before inserting the test data.

**Performance:** The seeder uses Prisma's `createMany` for bulk insertion, which is much more efficient than individual `create` operations, especially when dealing with large datasets.

## 🎯 Use Cases

### User Management

#### Create User
**Endpoint**: `POST /api/v1/users`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "id": "user_1234567890_abcdef123",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### Booking Management

#### Create Booking
**Endpoint**: `POST /api/v1/bookings`

**Request Body**:
```json
{
  "userId": "user_1234567890_abcdef123",
  "serviceId": "service_1234567890_abcdef123",
  "startDate": "2023-12-15T10:00:00.000Z",
  "endDate": "2023-12-15T11:00:00.000Z",
  "notes": "Special requirements"
}
```

**Response**:
```json
{
  "id": "booking_1234567890_abcdef123",
  "userId": "user_1234567890_abcdef123",
  "serviceId": "service_1234567890_abcdef123",
  "startDate": "2023-12-15T10:00:00.000Z",
  "endDate": "2023-12-15T11:00:00.000Z",
  "status": "CONFIRMED",
  "notes": "Special requirements",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### Get User Bookings
**Endpoint**: `GET /api/v1/users/{userId}/bookings`

**Response**:
```json
{
  "bookings": [
    {
      "id": "booking_1234567890_abcdef123",
      "serviceId": "service_1234567890_abcdef123",
      "startDate": "2023-12-15T10:00:00.000Z",
      "endDate": "2023-12-15T11:00:00.000Z",
      "status": "CONFIRMED",
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

## 🏛️ Clean Architecture Principles

### Domain Layer
- Contains business entities with validation rules
- Defines repository interfaces
- No dependencies on external frameworks

### Application Layer
- Contains use cases (business logic)
- Defines DTOs for data transfer
- Depends only on domain layer

### Infrastructure Layer
- Implements repository interfaces
- Handles database operations
- Manages external service integrations

### Presentation Layer
- Handles HTTP requests/responses
- Validates input data
- Orchestrates use cases

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/booking_api_db` |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `postgres` |
| `POSTGRES_DB` | PostgreSQL database name | `booking_api_db` |
| `POSTGRES_PORT` | PostgreSQL port | `5433` |
| `NODE_ENV` | Environment | `development` |
| `PORT` | Application port | `3000` |
| `API_PREFIX` | API prefix | `api/v1` |

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

1. **Follow Clean Architecture**: Keep dependencies pointing inward
2. **Use DDD**: Implement business logic in domain entities
3. **Validate Input**: Use class-validator for DTOs
4. **Write Tests**: Cover use cases and domain logic
5. **Document APIs**: Use Swagger decorators
6. **Environment Variables**: Never hardcode configuration

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
