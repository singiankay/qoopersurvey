import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('form')
@UseGuards(JwtAuthGuard)
export class FormController {
  constructor() {}

  @Get()
  async getForms(): Promise<any> {
    return true;
  }

  @Post()
  async createForm(): Promise<any> {}
}
