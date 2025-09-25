import { Module, Provider } from '@nestjs/common';
import { UserController } from '../../presentation/controllers/user.controller';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

const services: Provider[] = [
  { provide: IUserRepository, useClass: UserRepository },
];

/**
 * User infrastructure module containing all user-related dependencies
 * This module handles the infrastructure layer and coordinates with application layer
 */
@Module({
  controllers: [UserController],
  providers: [
    // Infrastructure services first
    PrismaService,
    ...services,

    // Use cases (after repositories are defined)
    CreateUserUseCase,
  ],
})
export class UserInfrastructureModule {}
