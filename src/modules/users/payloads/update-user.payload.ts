// update user payload
 import { Field, InputType } from '@nestjs/graphql';
 import { IsOptional, IsString } from 'class-validator';
 
 @InputType()
 export class UpdateUserPayload {
   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   readonly firstName?: string;
 
   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   readonly lastName?: string;
 
   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   readonly phoneNumber?: string;
 
   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   readonly email?: string;
 }
 
// compare this snippet from src\modules\users\services\users.service.ts:
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '@app/app-prisma/prisma.service';
// import { ResourceNotFoundException } from '@app/shared/exceptions/coded-exception';
// import { CreateUserPayload } from '../payloads/create-user.payload';
// 
// @Injectable()
// export class UsersService {
//   constructor(private readonly prismaService: PrismaService) {}
//   async createUser(data: CreateUserPayload) {
//     return this.prismaService.user.create({ data });
//   }
//   async findAll(queryUsersPayload: any) {
//     return this.prismaService.user.findMany();
//   }
// 
//   // find user by phoneNumber and validate password
//   async findOneOrThrow(data: any) {
//     const user = await this.prismaService.user.findFirst({
//       where: { OR: [{ phoneNumber: data }, { email: data }, { id: data }] },
//       include: { role: true },
//     });
//     if (!user || user.deletedAt) {
//       throw new ResourceNotFoundException('User not found');
//     }
//     return user;
//   }
// 
//   async updateUser(id: string, data: any) {
//     return this.prismaService.user.update({
//       where: { id },
//       data,
//     });
//   }
// }
// 
// compare this snippet from src\modules\users\resolvers\
