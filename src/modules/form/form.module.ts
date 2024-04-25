import { Module } from '@nestjs/common';
import { JwtAuthService } from '../auth/jwt.service';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [FormService, JwtAuthService, PrismaService],
  controllers: [FormController],
  exports: [FormService],
})
export class FormModule {
  constructor(private jwtAuthService: JwtAuthService) {}
}
