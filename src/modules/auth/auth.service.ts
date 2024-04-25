import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(body: UserDto): Promise<any> {
    const saltOrRounds = 12;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const user = await this.userService.find(body);

    if (user) {
      throw new BadRequestException('email already exists!.');
    }

    const newUser = { ...body, password: hashedPassword };
    return this.userService.create(newUser);
  }

  async validateUser(body: UserDto): Promise<{ access_token: string }> {
    const search = await this.userService.find(body);
    if (!search) {
      throw new BadRequestException('Email not found.');
    }
    const { password, id, ...user } = search;
    const compare = await bcrypt.compare(body.password, password);
    if (!compare) {
      throw new BadRequestException('Invalid Password');
    }

    const jwt = await this.jwtService.signAsync({
      payload: { ...user, sub: id },
    });

    return {
      access_token: jwt,
    };
  }

  async decodeHeaders(bearer: string): Promise<any> {
    const token = bearer.replace('Bearer ', '');
    return this.jwtService.decode(token);
  }
}
