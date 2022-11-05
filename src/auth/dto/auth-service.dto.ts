import { IAuthController } from './auth-controller.dto';

export namespace IAuthService {
  export class LoginDTO extends IAuthController.LoginDTO {}
  export class SignUpDTO extends IAuthController.SignUpDTO {}
  export class RefreshTokenDTO {
    oldToken: string;
  }
}
