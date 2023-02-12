import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from '@app/modules/devices/dtos/create-device.dto';
import { UpdateDeviceDto } from '@app/modules/devices/dtos/update-device.dto';
import { PrismaService } from '@app/app-prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(filterQuery: any) {}

  findAll(collectionDto: any) {}

  createOne(dto: CreateDeviceDto) {
    return this.prismaService.device.create({ data: dto });
  }

  updateOne(filter: any, dto: UpdateDeviceDto) {}

  removeOne(filter: any) {}

  public async findGeofences(filter: { deviceId: string; slots: number[] }) {
    return [];
  }
}
