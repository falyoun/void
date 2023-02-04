import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateDeviceDto } from '@app/modules/devices/dtos/create-device.dto';
import { UpdateDeviceDto } from '@app/modules/devices/dtos/update-device.dto';

@Injectable()
export class DevicesService {
  constructor() {}

  findOne(filterQuery: FilterQuery<any>) {}

  findAll(collectionDto: any) {}

  createOne(dto: CreateDeviceDto) {}

  updateOne(filter: FilterQuery<any>, dto: UpdateDeviceDto) {}

  removeOne(filter: FilterQuery<any>) {}

  public async findGeofences(filter: { deviceId: string; slots: number[] }) {
    return [];
  }
}
