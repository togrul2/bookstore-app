import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsersModule } from '../users/users.module';
import { RoleGuard } from './guards/role.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // Global authentication guard.
    { provide: APP_GUARD, useClass: AuthGuard },
    // Global role guard.
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
        },
      }),
    }),
  ],
})
export class AuthModule {}
