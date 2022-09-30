import { Module } from '@nestjs/common';
import { UsersResolver } from '@app/modules/users/resolvers/users.resolver';
import { UsersService } from '@app/modules/users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '@app/modules/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
