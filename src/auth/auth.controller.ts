import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SwaggerDocs } from '@/shared/decorators/swagger.decorator';
import { User } from '@/shared/decorators/user.decorator';
import { AuthGuard } from '@/shared/guards/auth.guard';
import { IUser } from '@/user/dto/user.dto';
import { IAuthController } from './dto/auth-controller.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SwaggerDocs({ response: IAuthController.LoginResponse })
  async login(
    @Body() body: IAuthController.LoginDTO,
  ): Promise<IAuthController.LoginResponse> {
    return await this.authService.login(body);
  }

  @Post('signup')
  @SwaggerDocs({ response: IAuthController.SignUpResponse })
  async signUp(
    @Body() body: IAuthController.SignUpDTO,
  ): Promise<IAuthController.SignUpResponse> {
    return await this.authService.signUp(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @SwaggerDocs({
    response: IAuthController.SignUpResponse,
    hasBearerToken: true,
  })
  async getMe(@User() user: IUser): Promise<IAuthController.GetMeResponse> {
    return await { user };
  }

  @Post('refreshToken')
  @SwaggerDocs({
    response: IAuthController.RefreshTokenResponse,
    hasBearerToken: true,
  })
  async refreshToken(
    @Request() request: Request,
  ): Promise<IAuthController.RefreshTokenResponse> {
    const oldToken = request.headers['authorization'];
    return await this.authService.refreshToken({ oldToken });
  }
}
