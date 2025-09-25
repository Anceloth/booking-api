# Request Flow Diagram

This document provides a visual representation of the request flow through the application layers.

## 🔄 Complete Request Flow

```
HTTP Request
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                PRESENTATION LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  UserController                                        ││
│  │  • Receives HTTP POST /api/v1/users                   ││
│  │  • Validates CreateUserDto                            ││
│  │  • Calls CreateUserUseCase                            ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                APPLICATION LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  CreateUserUseCase                                     ││
│  │  • Validates business rules                            ││
│  │  • Checks if user exists                               ││
│  │  • Creates User entity                                 ││
│  │  • Calls UserRepository                                ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                  DOMAIN LAYER                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  User Entity                                           ││
│  │  • Enforces business rules                             ││
│  │  • Validates domain invariants                         ││
│  │  • Contains domain logic                               ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│              INFRASTRUCTURE LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  UserRepository                                        ││
│  │  • Implements IUserRepository                          ││
│  │  • Maps domain entities to database models             ││
│  │  • Calls PrismaService                                 ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                DATABASE LAYER                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  PrismaService                                         ││
│  │  • Manages database connection                          ││
│  │  • Executes SQL queries                                ││
│  │  │  • INSERT INTO users (id, email, name)              ││
│  │  │  • VALUES (?, ?, ?)                                 ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL DATABASE                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  users table                                           ││
│  │  • Stores user data                                    ││
│  │  • Returns created record                              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
     │
     ▼
Response flows back through the same layers in reverse order
     │
     ▼
HTTP Response (UserResponseDto)
```

## 🔧 Detailed Step-by-Step Flow

### Step 1: HTTP Request
```
POST /api/v1/users
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe"
}
```

### Step 2: Controller Processing
```typescript
@Post()
async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserResponseDto> {
  // 1. DTO validation (automatic by NestJS)
  // 2. Delegate to use case
  return this.createUserUseCase.execute(createUserDto);
}
```

### Step 3: Use Case Execution
```typescript
async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
  // 1. Extract data from DTO
  const { email, name } = createUserDto;
  
  // 2. Check if user exists
  const existingUser = await this.userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }
  
  // 3. Generate ID
  const id = this.generateId();
  
  // 4. Create domain entity
  const user = new User(id, email, name);
  
  // 5. Save to repository
  const createdUser = await this.userRepository.create(user);
  
  // 6. Return response DTO
  return new UserResponseDto(createdUser);
}
```

### Step 4: Domain Entity Creation
```typescript
constructor(id: string, email: string, name: string) {
  this.id = id;
  this.email = email;
  this.name = name;
  this.createdAt = new Date();
  this.updatedAt = new Date();
  
  this.validate(); // Domain validation
}

private validate(): void {
  if (!this.id || this.id.trim().length === 0) {
    throw new Error('User ID cannot be empty');
  }
  if (!this.email || !this.isValidEmail(this.email)) {
    throw new Error('User email must be a valid email address');
  }
  if (!this.name || this.name.length < 2) {
    throw new Error('User name must be at least 2 characters long');
  }
}
```

### Step 5: Repository Implementation
```typescript
async create(user: User): Promise<User> {
  // 1. Map domain entity to database model
  const createdUser = await this.prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
  
  // 2. Map database result back to domain entity
  return new User(
    createdUser.id,
    createdUser.email,
    createdUser.name,
    createdUser.createdAt,
    createdUser.updatedAt
  );
}
```

### Step 6: Database Operation
```sql
INSERT INTO users (id, email, name, "createdAt", "updatedAt")
VALUES ('user_1234567890_abcdef123', 'john@example.com', 'John Doe', NOW(), NOW())
RETURNING *;
```

### Step 7: Response Flow
```
Database Result → Repository → Use Case → Controller → HTTP Response
```

## 🎯 Key Points

1. **Unidirectional Flow**: Dependencies always point inward
2. **Separation of Concerns**: Each layer has a specific responsibility
3. **Interface Segregation**: Use interfaces for all external dependencies
4. **Domain Validation**: Business rules are enforced in domain entities
5. **Dependency Injection**: All dependencies are injected, not instantiated
6. **Error Handling**: Errors are handled appropriately at each layer
7. **Testability**: Each layer can be tested in isolation

## 🔍 Data Transformation

```
HTTP Request Body
       │
       ▼
CreateUserDto (validation)
       │
       ▼
Domain User Entity (business rules)
       │
       ▼
Database Model (Prisma)
       │
       ▼
PostgreSQL Record
       │
       ▼
Database Result
       │
       ▼
Domain User Entity (reconstructed)
       │
       ▼
UserResponseDto (output formatting)
       │
       ▼
HTTP Response Body
```

This flow ensures that:
- Input is validated at the boundary
- Business rules are enforced in the domain
- Data is properly transformed between layers
- The database is abstracted behind interfaces
- The response is properly formatted for the client
