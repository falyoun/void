import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/modules/users/models/user.model';
import { UsersService } from '@app/modules/users/services/users.service';
import { QueryUsersPayload } from '../payloads/query-user.payload';
import { CreateUserPayload } from '../payloads/create-user.payload';
import { UpdateUserPayload } from '../payloads/update-user.payload';
import { JwtRefreshGuard } from '@app/modules/registration/guards/jwt-refresh.guard';
import { GetUser } from '@app/modules/registration/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { UpdateUserPasswordPayload } from '../payloads/update-user-password.payload';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('payload') payload: CreateUserPayload) {
    return this.usersService.createUser(payload);
  }

  @Query(() => [User])
  users(@Args() queryUsersArgsPayload: QueryUsersPayload): Promise<User[]> {
    return this.usersService.findAll(queryUsersArgsPayload);
  }

  @Mutation(() => User)
  @UseGuards(JwtRefreshGuard)
  updateUser(@Args('payload') payload: UpdateUserPayload, @GetUser() user) {
    return this.usersService.updateUser(payload, user);
  }

  // delete user
  @Mutation(() => User)
  @UseGuards(JwtRefreshGuard)
  deleteUser(@GetUser() user) {
    return this.usersService.deleteUser(user);
  }

  // update password
  @Mutation(() => User)
  @UseGuards(JwtRefreshGuard)
  updatePassword(
    @Args('payload') payload: UpdateUserPasswordPayload,
    @GetUser() user,
  ) {
    return this.usersService.updatePassword(payload, user);
  }
}
