import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * User domain entity with business rules and validations
 * This entity represents the core business logic for a User
 */
export class User {
  @IsNotEmpty({ message: 'ID is required' })
  @IsString({ message: 'ID must be a string' })
  public readonly id: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  public readonly email: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  public readonly name: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    
    this.validate();
  }

  /**
   * Validates the user entity according to business rules
   * @throws Error if validation fails
   */
  private validate(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('User ID cannot be empty');
    }

    if (!this.email || this.email.trim().length === 0) {
      throw new Error('User email cannot be empty');
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error('User email must be a valid email address');
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }

    if (this.name.length < 2) {
      throw new Error('User name must be at least 2 characters long');
    }

    if (this.name.length > 100) {
      throw new Error('User name must not exceed 100 characters');
    }
  }

  /**
   * Validates email format using a simple regex
   * @param email Email to validate
   * @returns true if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Updates the user name
   * @param newName New name for the user
   * @returns New User instance with updated name
   */
  public updateName(newName: string): User {
    return new User(
      this.id,
      this.email,
      newName,
      this.createdAt,
      new Date()
    );
  }

  /**
   * Updates the user email
   * @param newEmail New email for the user
   * @returns New User instance with updated email
   */
  public updateEmail(newEmail: string): User {
    return new User(
      this.id,
      newEmail,
      this.name,
      this.createdAt,
      new Date()
    );
  }

  /**
   * Converts the entity to a plain object
   * @returns Plain object representation of the user
   */
  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
