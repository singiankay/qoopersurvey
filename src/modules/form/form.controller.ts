import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Role } from '../auth/dto/auth.dto';
import { RoleDecorator } from '../auth/decorators/role.decorator';

@Controller('form')
@UseGuards(JwtAuthGuard)
export class FormController {
  constructor() {}

  @Get()
  @RoleDecorator([Role.Admin])
  async getForms(): Promise<any> {
    return true;
  }

  @Post()
  @RoleDecorator([Role.Admin])
  async createForm(): Promise<any> {}
}
