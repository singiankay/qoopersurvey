import { Injectable } from '@nestjs/common';
import { UserDto } from '../auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async find(user: UserDto): Promise<any> {
    const result = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return result;
  }

  async create(user: UserDto): Promise<any> {
    const result = await this.prisma.user.create({
      data: { ...user },
    });
    return result;
  }
}
