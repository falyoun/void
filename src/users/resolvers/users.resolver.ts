import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/users/models/user.model';
import { QueryUsersArgsDto } from '@app/users/dtos/query-users-args.dto';
import { UsersService } from '@app/users/services/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query((returns) => [User])
  users(@Args() queryUsersArgsDto: QueryUsersArgsDto): Promise<User[]> {
    return this.usersService.findAll(queryUsersArgsDto);
  }
}
