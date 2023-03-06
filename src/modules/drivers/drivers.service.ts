import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Driver } from '@app/modules/drivers/models/driver.model';
import { UpdateDriverPayload } from '@app/modules/drivers/payloads/update-driver.payload';
import { CreateDriverPayload } from '@app/modules/drivers/payloads/create-driver.payload';
import { VehiclesService } from '@app/modules/vehicles/vehicles.service';
import { UsersService } from '@app/modules/users/services/users.service';
import { PrismaService } from '@app/app-prisma/prisma.service';
import { QueryDriversPayload } from './payloads/query-drivers.payload';

@Injectable()
export class DriversService {
  constructor(
    @Inject(forwardRef(() => VehiclesService))
    private readonly carsService: VehiclesService,
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  async findOne(filter: any) {
    return this.prismaService.driver.findFirst({
      where: filter,
      include: {
        user: true,
        rent: true,
      },
    });
  }

  async findAll(queryDriversPayload: QueryDriversPayload) {
    return this.prismaService.driver.findMany({
      ...queryDriversPayload,
      include: {
        user: true,
        rent: true,
      },
    });
  }

  async createOne(payload: CreateDriverPayload) {
    // create prisma transaction
    return await this.prismaService.$transaction(async (prisma) => {
      const user = await this.userService.createUser(payload, prisma);
      return await prisma.driver.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
    });
  }

  async updateOne(filter: Driver, payload: UpdateDriverPayload) {
    try {
      return this.prismaService.driver.update({
        where: { id: filter.id },
        data: payload,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteOne(filter: Driver) {
    return this.prismaService.$transaction(async (prisma) => {
      await this.userService.deleteUser(filter, prisma);
      return prisma.driver.update({
        where: { id: filter.id },
        data: {
          deletedAt: new Date(),
        },
      });
    });
  }
}
