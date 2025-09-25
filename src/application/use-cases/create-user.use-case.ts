import { Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
/**
 * Use case for creating a new user
 * Contains the business logic for user creation
 */
@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Executes the create user use case
   * @param createUserDto User data for creation
   * @returns Promise<UserResponseDto> Created user response
   * @throws ConflictException if user with email already exists
   */
  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, name } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate unique ID (in a real app, this might be done by the repository)
    const id = this.generateId();

    // Create user entity with domain validation
    const user = new User(id, email, name);

    // Save user to repository
    const createdUser = await this.userRepository.create(user);

    // Return response DTO
    return new UserResponseDto(createdUser);
  }

  /**
   * Generates a unique ID for the user
   * In a real application, this might be handled by the database or a UUID service
   * @returns string Unique identifier
   */
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
