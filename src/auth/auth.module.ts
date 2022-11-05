import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserRepository } from '@/user/database/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1s' },
      }),
    }),
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
