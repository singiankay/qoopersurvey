import { FastifyRequest } from 'fastify';
import fastify from 'fastify';
import { UserDto } from '../../../src/modules/auth/dto/auth.dto';

declare module 'fastify' {
  export interface FastifyRequest {
    user?: UserDto;
  }
}
