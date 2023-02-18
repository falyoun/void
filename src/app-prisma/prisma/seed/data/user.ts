import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
  static async seed(prisma: PrismaClient) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('P@ssw0rd', salt);

    const users = {
        firstName: 'Sabah',
        lastName: 'Assi',
        email: 'admin@void.com',
        password: hashedPassword,
        phoneNumber: '123456789',
        isActive: true,
        role:{
          create:{
            name: Role.ADMIN,
            createdAt: new Date('Tue jan 18 2022 16:16:50 GMT-0400 (Eastern Daylight Time)'),
          }
        },
        createdAt: new Date('Tue jan 18 2022 16:16:50 GMT-0400 (Eastern Daylight Time)'),
      };

    
    await prisma.user.create({
      data: users,
    });
    return await prisma.user.findMany();
  }
}
