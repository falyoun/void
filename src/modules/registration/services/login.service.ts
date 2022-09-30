import { Injectable } from '@nestjs/common';
import { UsersService } from '@app/modules/users/services/users.service';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}
  login() {}
}
