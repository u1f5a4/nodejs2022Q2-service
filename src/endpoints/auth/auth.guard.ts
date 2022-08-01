import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (token) return true;

    return false;
  }

  private getToken(request: any) {
    try {
      return request.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }
}
