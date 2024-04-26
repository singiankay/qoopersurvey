import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { QuestionService } from '../question/question.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    ResponseService,
    JwtStrategy,
    PrismaService,
    AuthService,
    JwtService,
    UserService,
    QuestionService,
  ],
  controllers: [ResponseController],
})
export class ResponseModule {}
