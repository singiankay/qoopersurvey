import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { FormService } from '../form/form.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Module({
  providers: [
    FormService,
    JwtStrategy,
    PrismaService,
    AuthService,
    JwtService,
    UserService,
    QuestionService,
  ],
  controllers: [QuestionController],
})
export class QuestionModule {}
