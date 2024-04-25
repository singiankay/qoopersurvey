import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RoleDecorator } from '../decorators/role.decorator';
import { AuthService } from '../auth.service';
// import { RoleDecorator } from '../decorators/role.decorator';
// import { Observable } from 'rxjs';
// import { Role } from '../dto/auth.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const roleDecorator = this.reflector.get(
      RoleDecorator,
      context.getHandler(),
    );

    if (!roleDecorator) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const headers = (await this.authService.decodeHeaders(
      request.headers.authorization,
    )) as any;
    const role = headers.payload.role;
    return roleDecorator.some((r) => r === role);
  }
}
