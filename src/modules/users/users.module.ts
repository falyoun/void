import { Module } from '@nestjs/common';
import { UsersResolver } from '@app/modules/users/resolvers/users.resolver';
import { UsersService } from '@app/modules/users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '@app/modules/users/models/user.model';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';

@Module({
  imports: [AppPrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
