import { Module } from '@nestjs/common';
import { UsersService } from '@app/modules/users/services/users.service';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';

@Module({
  imports: [AppPrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
