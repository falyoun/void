import { Injectable } from '@nestjs/common';
import { QueryUsersArgsDto } from '@app/users/dtos/query-users-args.dto';
import { User } from '@app/users/models/user.model';

@Injectable()
export class UsersService {
  async findAll(queryUsersArgsDto: QueryUsersArgsDto) {
    return [] as User[];
  }
}
