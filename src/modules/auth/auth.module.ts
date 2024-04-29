import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    PrismaModule,
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {
  constructor() {}
}
