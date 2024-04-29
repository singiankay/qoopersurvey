import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Module({
  imports: [],
  providers: [
    FormService,
    JwtStrategy,
    PrismaService,
    AuthService,
    JwtService,
    UserService,
  ],
  controllers: [FormController],
  exports: [FormService],
})
export class FormModule {
  constructor() {}
}
