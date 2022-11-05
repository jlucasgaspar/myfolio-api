import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserControllre {
  // constructor() {}
}
