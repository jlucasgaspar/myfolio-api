import { Module } from '@nestjs/common';
import { UserRepository } from './database/user.repository';

@Module({
  imports: [],
  providers: [UserRepository],
})
export class UserModule {}
