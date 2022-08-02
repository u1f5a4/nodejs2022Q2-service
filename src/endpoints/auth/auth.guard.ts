import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (token) return this.verify(token);
    return false;
  }

  private getToken(request: any) {
    try {
      return request.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }

  private verify(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
