import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role, UserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
import { LocalGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RoleDecorator } from './decorators/role.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Register User',
    description: 'Registers User',
    operationId: 'register',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    description: 'User object',
    required: true,
    type: UserDto,
  })
  @Post('register')
  async register(@Body() body: UserDto): Promise<UserDto> {
    return this.authService.register(body);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Logs in User',
    operationId: 'login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({
    description: 'User object',
    required: true,
    type: UserDto,
  })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() body: UserDto, @Req() req: FastifyRequest): Promise<any> {
    return req.user;
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Logs out User',
    operationId: 'logout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @RoleDecorator([Role.Admin, Role.User])
  async logout(): Promise<void> {}
}
