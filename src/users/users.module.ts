import { Module } from '@nestjs/common';
import { UsersResolver } from '@app/users/resolvers/users.resolver';
import { UsersService } from '@app/users/services/users.service';

@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
