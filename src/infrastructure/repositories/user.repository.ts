import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from '../database/prisma.service';

/**
 * User repository implementation using Prisma
 * Implements the domain repository interface
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user in the database
   * @param user User entity to create
   * @returns Promise<User> Created user entity
   */
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

  /**
   * Finds a user by ID
   * @param id User ID
   * @returns Promise<User | null> User entity or null if not found
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.createdAt,
      user.updatedAt
    );
  }

  /**
   * Finds a user by email
   * @param email User email
   * @returns Promise<User | null> User entity or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.createdAt,
      user.updatedAt
    );
  }

  /**
   * Finds all users
   * @returns Promise<User[]> Array of user entities
   */
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.name,
          user.createdAt,
          user.updatedAt
        )
    );
  }

  /**
   * Updates an existing user
   * @param user User entity to update
   * @returns Promise<User> Updated user entity
   */
  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
      },
    });

    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.name,
      updatedUser.createdAt,
      updatedUser.updatedAt
    );
  }

  /**
   * Deletes a user by ID
   * @param id User ID
   * @returns Promise<boolean> True if user was deleted, false otherwise
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if a user exists by email
   * @param email User email
   * @returns Promise<boolean> True if user exists, false otherwise
   */
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user !== null;
  }
}
