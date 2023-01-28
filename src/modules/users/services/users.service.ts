import { Injectable } from '@nestjs/common';
import { QueryUsersArgsDto } from '@app/modules/users/queries-types/query-users-args.dto';
import { CreateUserPayload } from '@app/modules/users/payloads/create-user.payload';
import { PrismaService } from '@app/app-prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserPayload) {
    return this.prismaService.user.create({ data });
  }
  async findAll(queryUsersArgsDto: QueryUsersArgsDto) {
    return this.prismaService.user.findMany();
  }
}
