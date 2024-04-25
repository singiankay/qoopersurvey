import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const userDto = new UserDto();
    userDto.email = email;
    userDto.password = password;
    const token = await this.authService.validateUser(userDto);
    if (!token) {
      throw new UnauthorizedException('Unauthorized!');
    }
    return token;
  }
}
