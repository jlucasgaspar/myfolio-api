import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@/user/dto/user.dto';
import * as Joi from 'joi';

//* POST /login
@JoiSchemaOptions({ allowUnknown: false, abortEarly: false })
class ILoginDTO {
  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().email().required())
  email: string;

  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().required())
  password: string;
}
class ILoginResponse {
  @ApiProperty({ type: IUser })
  user: IUser;

  @ApiProperty({ type: String })
  token: string;
}

//* POST /signUp
class ISignUpDTO extends ILoginDTO {
  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().required())
  phone: string;
}
class ISignUpResponse extends ILoginResponse {}

//* GET /me
class IGetMeDTO {}
class IGetMeResponse {
  @ApiProperty({ type: IUser })
  user: IUser;
}

//* POST /refreshToken
class IRefreshTokenDTO {}
class IRefreshTokenResponse extends ILoginResponse {}

//* exports
export namespace IAuthController {
  export class LoginDTO extends ILoginDTO {}
  export class LoginResponse extends ILoginResponse {}
  export class SignUpDTO extends ISignUpDTO {}
  export class SignUpResponse extends ISignUpResponse {}
  export class GetMeDTO extends IGetMeDTO {}
  export class GetMeResponse extends IGetMeResponse {}
  export class RefreshTokenDTO extends IRefreshTokenDTO {}
  export class RefreshTokenResponse extends IRefreshTokenResponse {}
}
