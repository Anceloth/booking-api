# Architecture Flow Documentation

This document describes the complete flow from HTTP request to database connection, following Clean Architecture principles and Domain-Driven Design (DDD).

## 🏗️ Architecture Overview

The application follows **Clean Architecture** (Onion Architecture) with the following layers:

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
│  ┌─────────────────────────────────────────────────────────┐│
│  │                DTOs                                    ││
│  │  • Data Transfer Objects                              ││
│  │  • Input/Output validation                            ││
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
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Repository Interfaces                   ││
│  │  • Contract definitions                               ││
│  │  • Domain requirements                                ││
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
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Database Services                       ││
│  │  • Prisma client                                      ││
│  │  • Connection management                              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Complete Request Flow

### 1. HTTP Request Entry Point

**File**: `src/presentation/controllers/user.controller.ts`

```typescript
@Post()
async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserResponseDto> {
  return this.createUserUseCase.execute(createUserDto);
}
```

**What happens here:**
- HTTP POST request arrives at `/api/v1/users`
- NestJS automatically validates the request body against `CreateUserDto`
- Controller delegates to the use case

### 2. Application Layer - Use Case

**File**: `src/application/use-cases/create-user.use-case.ts`

```typescript
async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
  const { email, name } = createUserDto;

  // 1. Check if user already exists
  const existingUser = await this.userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // 2. Generate unique ID
  const id = this.generateId();

  // 3. Create domain entity with validation
  const user = new User(id, email, name);

  // 4. Save to repository
  const createdUser = await this.userRepository.create(user);

  // 5. Return response DTO
  return new UserResponseDto(createdUser);
}
```

**What happens here:**
- Business logic orchestration
- Domain entity creation with validation
- Repository coordination
- Error handling for business rules

### 3. Domain Layer - Entity

**File**: `src/domain/entities/user.entity.ts`

```typescript
constructor(id: string, email: string, name: string, createdAt: Date = new Date(), updatedAt: Date = new Date()) {
  this.id = id;
  this.email = email;
  this.name = name;
  this.createdAt = createdAt;
  this.updatedAt = updatedAt;
  
  this.validate(); // Domain validation
}

private validate(): void {
  if (!this.id || this.id.trim().length === 0) {
    throw new Error('User ID cannot be empty');
  }
  // ... more validations
}
```

**What happens here:**
- Domain validation rules are enforced
- Business invariants are maintained
- Entity state is validated

### 4. Infrastructure Layer - Repository

**File**: `src/infrastructure/repositories/user.repository.ts`

```typescript
async create(user: User): Promise<User> {
  const createdUser = await this.prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });

  return new User(
    createdUser.id,
    createdUser.email,
    createdUser.name,
    createdUser.createdAt,
    createdUser.updatedAt
  );
}
```

**What happens here:**
- Database operations using Prisma
- Entity to database model mapping
- Database result to domain entity mapping

### 5. Database Layer - Prisma

**File**: `src/infrastructure/database/prisma.service.ts`

```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

**What happens here:**
- Database connection management
- Prisma client initialization
- Connection lifecycle management

## 📁 File Structure and Responsibilities

```
src/
├── presentation/
│   └── controllers/
│       └── user.controller.ts          # HTTP request handling
├── application/
│   ├── use-cases/
│   │   └── create-user.use-case.ts    # Business logic orchestration
│   └── dtos/
│       ├── create-user.dto.ts         # Input validation
│       └── user-response.dto.ts       # Output formatting
├── domain/
│   ├── entities/
│   │   └── user.entity.ts             # Business rules and validation
│   └── repositories/
│       └── user.repository.interface.ts # Contract definition
├── infrastructure/
│   ├── modules/
│   │   └── user.module.ts             # Dependency injection setup
│   ├── repositories/
│   │   └── user.repository.ts         # Database operations
│   └── database/
│       └── prisma.service.ts          # Database connection
└── app.module.ts                      # Application bootstrap
```

## 🔧 Dependency Injection Flow

### Module Configuration

**File**: `src/infrastructure/modules/user.module.ts`

```typescript
@Module({
  controllers: [UserController],
  providers: [
    PrismaService,                                    // Database service
    { provide: IUserRepository, useClass: UserRepository }, // Repository implementation
    CreateUserUseCase,                                // Use case
  ],
})
export class UserInfrastructureModule {}
```

**Dependency Chain:**
1. `UserController` depends on `CreateUserUseCase`
2. `CreateUserUseCase` depends on `IUserRepository`
3. `UserRepository` depends on `PrismaService`
4. `PrismaService` manages database connection

## 🚀 How to Add New Features

### Step 1: Define Domain Entity
Create or update domain entities in `src/domain/entities/`

```typescript
export class NewEntity {
  constructor(/* parameters */) {
    // Domain validation
    this.validate();
  }
  
  private validate(): void {
    // Business rules
  }
}
```

### Step 2: Define Repository Interface
Create repository interface in `src/domain/repositories/`

```typescript
export interface INewEntityRepository {
  create(entity: NewEntity): Promise<NewEntity>;
  findById(id: string): Promise<NewEntity | null>;
  // ... other methods
}
```

### Step 3: Create DTOs
Create input/output DTOs in `src/application/dtos/`

```typescript
export class CreateNewEntityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class NewEntityResponseDto {
  id: string;
  name: string;
  // ... other fields
}
```

### Step 4: Implement Use Case
Create use case in `src/application/use-cases/`

```typescript
@Injectable()
export class CreateNewEntityUseCase {
  constructor(private readonly repository: INewEntityRepository) {}
  
  async execute(dto: CreateNewEntityDto): Promise<NewEntityResponseDto> {
    // Business logic
  }
}
```

### Step 5: Implement Repository
Create repository implementation in `src/infrastructure/repositories/`

```typescript
@Injectable()
export class NewEntityRepository implements INewEntityRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(entity: NewEntity): Promise<NewEntity> {
    // Database operations
  }
}
```

### Step 6: Create Controller
Create controller in `src/presentation/controllers/`

```typescript
@Controller('new-entities')
export class NewEntityController {
  constructor(private readonly useCase: CreateNewEntityUseCase) {}
  
  @Post()
  async create(@Body() dto: CreateNewEntityDto): Promise<NewEntityResponseDto> {
    return this.useCase.execute(dto);
  }
}
```

### Step 7: Update Module
Add new dependencies to `src/infrastructure/modules/user.module.ts`

```typescript
@Module({
  controllers: [UserController, NewEntityController],
  providers: [
    PrismaService,
    { provide: IUserRepository, useClass: UserRepository },
    { provide: INewEntityRepository, useClass: NewEntityRepository },
    CreateUserUseCase,
    CreateNewEntityUseCase,
  ],
})
export class UserInfrastructureModule {}
```

## 🎯 Key Principles

### 1. Dependency Direction
- Dependencies always point inward (toward the domain)
- Outer layers depend on inner layers, never the reverse
- Domain layer has no dependencies on external frameworks

### 2. Interface Segregation
- Use interfaces for all external dependencies
- Keep interfaces focused and cohesive
- Implement interfaces in the infrastructure layer

### 3. Single Responsibility
- Each class has one reason to change
- Controllers handle HTTP concerns
- Use cases handle business logic
- Repositories handle data persistence

### 4. Open/Closed Principle
- Open for extension, closed for modification
- Add new features by extending existing interfaces
- Implement new repository types without changing use cases

## 🔍 Testing Strategy

### Unit Tests
- Test domain entities in isolation
- Test use cases with mocked repositories
- Test repository implementations with test database

### Integration Tests
- Test complete request flow
- Test database operations
- Test external service integrations

### Test File Structure
```
src/
├── domain/
│   └── entities/
│       └── user.entity.spec.ts
├── application/
│   └── use-cases/
│       └── create-user.use-case.spec.ts
└── infrastructure/
    └── repositories/
        └── user.repository.spec.ts
```

## 📝 Best Practices

1. **Always validate input** at the controller level using DTOs
2. **Enforce business rules** in domain entities
3. **Use dependency injection** for all external dependencies
4. **Keep controllers thin** - delegate to use cases
5. **Make use cases testable** by injecting dependencies
6. **Use interfaces** for all external dependencies
7. **Handle errors appropriately** at each layer
8. **Use meaningful names** for classes and methods
9. **Document complex business logic** with comments
10. **Follow consistent naming conventions** throughout the project

This architecture ensures maintainability, testability, and scalability while following Clean Architecture principles and Domain-Driven Design patterns.
