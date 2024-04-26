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

  async register(body: UserDto): Promise<UserDto> {
    const saltOrRounds = 12;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const user = await this.userService.find(body);

    if (user) {
      throw new BadRequestException('email already exists!.');
    }

    const newUser = { ...body, password: hashedPassword };
    const result = await this.userService.create(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...toReturn } = result;
    return toReturn;
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

  async getHeaders(bearer: string): Promise<UserDto> {
    const headers = await this.decodeHeaders(bearer);
    const { sub, ...h } = headers.payload;
    const a = new UserDto({ ...h, id: sub });
    return a;
  }

  async decodeHeaders(bearer: string): Promise<any> {
    const token = bearer.replace('Bearer ', '');
    return this.jwtService.decode(token);
  }
}
