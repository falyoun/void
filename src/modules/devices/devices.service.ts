import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from '@app/modules/devices/dtos/create-device.dto';
import { UpdateDeviceDto } from '@app/modules/devices/dtos/update-device.dto';

@Injectable()
export class DevicesService {
  constructor() {}

  findOne(filterQuery: any) {}

  findAll(collectionDto: any) {}

  createOne(dto: CreateDeviceDto) {}

  updateOne(filter: any, dto: UpdateDeviceDto) {}

  removeOne(filter: any) {}

  public async findGeofences(filter: { deviceId: string; slots: number[] }) {
    return [];
  }
}
