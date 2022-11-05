import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@/user/database/user.model';
import { getErrorMessage } from '../i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new NotFoundException(getErrorMessage('notFound'));
    }

    const bearerToken = authorization.split('Bearer ')[1];

    if (!bearerToken) {
      throw new NotFoundException(getErrorMessage('invalid'));
    }

    try {
      await this.jwtService.verify(bearerToken);
    } catch (err) {
      throw new UnauthorizedException(getErrorMessage('tokenExpired'));
    }

    type Token = Record<string, string>;
    const { sub: userId } = this.jwtService.decode(bearerToken) as Token;

    const user = await UserModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(
        getErrorMessage('informationProvidedNotFound'),
      );
    }

    request.user = user;

    return true;
  }
}
