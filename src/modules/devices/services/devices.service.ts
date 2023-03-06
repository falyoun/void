import { Injectable } from '@nestjs/common';
import { CreateDevicePayload } from '@app/modules/devices/payloads/create-device.payload';
import { UpdateDevicePayload } from '@app/modules/devices/payloads/update-device.payload';
import { PrismaService } from '@app/app-prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(filterQuery: any) {}

  findAll(collectionPayload: any) {}

  createOne(payload: CreateDevicePayload) {
    return this.prismaService.device.create({ data: payload });
  }

  updateOne(filter: any, payload: UpdateDevicePayload) {}

  removeOne(filter: any) {}

  public async findGeofences(filter: { deviceId: string; slots: number[] }) {
    return [];
  }
}
