import { Injectable } from '@nestjs/common';
import { CreateUserPayload } from '@app/modules/users/payloads/create-user.payload';
import { PrismaService } from '@app/app-prisma/prisma.service';
import { ResourceNotFoundException } from '@app/shared/exceptions/coded-exception';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserPayload) {
    return this.prismaService.user.create({ data });
  }
  async findAll(queryUsersArgsDto: any) {
    return this.prismaService.user.findMany();
  }

  // find user by phoneNumber and validate password
  async findOneOrThrow(data: any) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ phoneNumber:data },{ email:data },  { id: data }] },
      include: { role: true },
    });
    if (!user || user.deletedAt) {
      throw new ResourceNotFoundException('User not found');
    }
    return user;
  }

}
