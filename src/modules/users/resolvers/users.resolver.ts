import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/modules/users/models/user.model';
import { QueryUsersArgsDto } from '@app/modules/users/queries-types/query-users-args.dto';
import { UsersService } from '@app/modules/users/services/users.service';
import { CreateUserPayload } from '@app/modules/users/payloads/create-user.payload';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  user(@Args('payload') payload: CreateUserPayload) {
    return this.usersService.createUser(payload);
  }

  @Query(() => [User])
  users(@Args() queryUsersArgsDto: QueryUsersArgsDto): Promise<User[]> {
    return this.usersService.findAll(queryUsersArgsDto);
  }
}
