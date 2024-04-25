import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Role, UserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
import { LocalGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RoleDecorator } from './decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: UserDto): Promise<any> {
    return this.authService.register(body);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() body: UserDto, @Req() req: FastifyRequest): Promise<any> {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @RoleDecorator([Role.Admin, Role.User])
  async logout(): Promise<void> {}
}
