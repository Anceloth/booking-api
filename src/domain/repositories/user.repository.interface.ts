import { User } from '../entities/user.entity';

/**
 * User repository interface defining the contract for user data operations
 * This interface belongs to the domain layer and defines the business requirements
 */
export abstract class IUserRepository {
  /**
   * Creates a new user
   * @param user User entity to create
   * @returns Promise<User> Created user entity
   */
  abstract create(user: User): Promise<User>;

  /**
   * Finds a user by ID
   * @param id User ID
   * @returns Promise<User | null> User entity or null if not found
   */
  abstract findById(id: string): Promise<User | null>;

  /**
   * Finds a user by email
   * @param email User email
   * @returns Promise<User | null> User entity or null if not found
   */
  abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Finds all users
   * @returns Promise<User[]> Array of user entities
   */
  abstract findAll(): Promise<User[]>;

  /**
   * Updates an existing user
   * @param user User entity to update
   * @returns Promise<User> Updated user entity
   */
  abstract update(user: User): Promise<User>;

  /**
   * Deletes a user by ID
   * @param id User ID
   * @returns Promise<boolean> True if user was deleted, false otherwise
   */
  abstract delete(id: string): Promise<boolean>;

  /**
   * Checks if a user exists by email
   * @param email User email
   * @returns Promise<boolean> True if user exists, false otherwise
   */
  abstract existsByEmail(email: string): Promise<boolean>;
}
