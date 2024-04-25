import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtDto, jwtPayloadDto } from './dto/jwt.dto';
import { UserDto } from './dto/auth.dto';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: UserDto): Promise<jwtDto> {
    const payload: jwtPayloadDto = {
      id: user.id,
      role: user.role,
    };

    const result = await this.jwtService.signAsync(payload);
    const jwt = new jwtDto();
    jwt.access_token = result;
    return jwt;
  }

  async verifyJwtToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async decodeHeaders(
    bearer: string,
  ): Promise<{ sub: number; account_type: string }> {
    const token = bearer.replace('Bearer ', '');
    return this.jwtService.decode(token);
  }
}
