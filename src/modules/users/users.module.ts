import { Module } from '@nestjs/common';
import { UsersService } from '@app/modules/users/services/users.service';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [AppPrismaModule],
  providers: [UsersService,UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
