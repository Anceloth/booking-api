import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma service for database operations
 * Handles database connection and provides Prisma client instance
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Initializes the Prisma client when the module starts
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Closes the Prisma client connection
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
