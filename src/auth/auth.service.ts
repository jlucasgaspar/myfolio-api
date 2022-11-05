import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@/user/database/user.repository';
import { IAuthService } from './dto/auth-service.dto';
import { getErrorMessage } from '@/shared/i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(params: IAuthService.SignUpDTO) {
    const userExists = await this.userRepository.findByEmail(params.email);
    if (userExists) {
      throw new BadRequestException(getErrorMessage('userAlreadyExists'));
    }
    const user = await this.userRepository.insert(params);
    return {
      user,
      token: this.jwtService.sign({ sub: user._id }),
    };
  }

  async login(params: IAuthService.LoginDTO) {
    const user = await this.userRepository.findByEmail(params.email, true);
    if (!user) {
      throw new NotFoundException(getErrorMessage('emailDontExists'));
    }
    return {
      user,
      token: this.jwtService.sign({ sub: user._id }),
    };
  }

  async refreshToken({ oldToken }: IAuthService.RefreshTokenDTO) {
    const token = oldToken.split('Bearer ')[1];
    if (!token) {
      throw new NotFoundException(getErrorMessage('invalid'));
    }
    type DecodedTokenJWT = Record<string, string>;
    const { sub: userId } = this.jwtService.decode(token) as DecodedTokenJWT;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(
        getErrorMessage('informationProvidedNotFound'),
      );
    }
    return {
      user,
      token: this.jwtService.sign({ sub: user._id }),
    };
  }
}
