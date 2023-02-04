import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { FindGeofenceDto } from './dto/find-geofence.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { UpdateGeofenceDto } from './dto/update-geofence.dto';
import { ConnectionPool } from '@app/sockets/connection-pool';
import { DeviceConnection } from '@app/sockets/connection';
import { DevicesService } from '@app/modules/devices/devices.service';

@Injectable()
export class GeofenceService {
  constructor(
    private readonly deviceService: DevicesService,
    @Inject(forwardRef(() => ConnectionPool))
    private readonly connectionPool: ConnectionPool,
  ) {}

  public async findAll(dto: FindGeofenceDto, companyFilter: any) {}

  public async findOne(id: string, companyFilter: any) {}

  public async create(data: CreateGeofenceDto, companyFilter: any) {}

  public async update(id: string, data: UpdateGeofenceDto) {}

  private static getConnectionOrFail(deviceId: string): DeviceConnection {
    return null;
  }

  public async delete(id: string, companyFilter: any) {}

  public async findEvents(dto: GetEventsDto, companyFilter: any) {}
}
