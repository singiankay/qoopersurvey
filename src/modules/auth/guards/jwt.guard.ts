import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../decorators/role.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const roleDecorator = this.reflector.get(
      RoleDecorator,
      context.getHandler(),
    );
    if (!roleDecorator) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const x = roleDecorator.some((r) => r === user.role);
    console.log('test', x);
    return x;
  }
}
