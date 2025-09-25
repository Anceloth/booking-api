import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserInfrastructureModule } from './infrastructure/modules/user.module';

/**
 * Main application module
 * Configures all dependencies and modules following clean architecture
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserInfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
