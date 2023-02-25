import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@app/app-prisma/prisma.service';
import { ResourceNotFoundException } from '@app/shared/exceptions/coded-exception';
import { CreateUserPayload } from '../payloads/create-user.payload';
import { QueryUsersPayload } from '../payloads/query-user.payload';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordPayload } from '../payloads/update-user-password.payload';
import { Options } from '../payloads/options.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserPayload, prisma?) {
    const prismaClient = prisma ?? this.prismaService;
   const t= await this.assetUserUniqueData(data.email, { prisma: prismaClient });
   const t2=await this.assetUserUniqueData(data.phoneNumber, { prisma: prismaClient });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    return prismaClient.user.create({ data });
  }

  // update user
  async updateUser(user: any, data: any) {
    await this.assertUserId(user.id);
    await this.assetUserUniqueData(data.email, { id: user.id });
    await this.assetUserUniqueData(data.phoneNumber, { id: user.id });
    return this.prismaService.user.update({
      where: { id: user.id },
      data,
    });
  }

  // delete user
  async deleteUser(user: any, prisma?) {
    const prismaClient = prisma ?? this.prismaService;
    await this.assertUserId(user.id);
    return prismaClient.user.update({
      where: { id: user.id },
      data: { deletedAt: new Date() },
    });
  }

  // update password
  async updatePassword(data: UpdateUserPasswordPayload, user: any) {
    await this.assertUserId(user.id);
    if (await bcrypt.compare(data.old_password, user.password)) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);
      return this.prismaService.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, passwordChangedAt: new Date() },
      });
    } else {
      throw new UnauthorizedException('Please check your password credentials');
    }
  }

  async findAll(queryUsersPayload: QueryUsersPayload) {
    return this.prismaService.user.findMany(queryUsersPayload);
  }

  // find user by phoneNumber and validate password
  async findOneOrThrow(data: any) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ phoneNumber: data }, { email: data }, { id: data }] },
      include: { role: true },
    });
    if (!user || user.deletedAt) {
      throw new ResourceNotFoundException('User not found');
    }
    return user;
  }

  // assert user exists
  async assertUserId(id: string) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user || user.deletedAt) {
      throw new ResourceNotFoundException('User not found');
    }
    return user;
  }
  // validate if user email, phoneNumber exists except the user id
  async assetUserUniqueData(data: any, options: Options) {
    const prismaClient = options.prisma ?? this.prismaService;
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [{ phoneNumber: data }, { email: data }],
        id: options.id ? { not: options.id } : undefined,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return user;
  }
}
