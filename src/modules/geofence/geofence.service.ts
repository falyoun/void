import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGeofencePayload } from './payloads/create-geofence.payload';
import { FindGeofencePayload } from './payloads/find-geofence.payload';
import { GetEventsPayload } from './payloads/get-events.payload';
import { UpdateGeofencePayload } from './payloads/update-geofence.payload';
import { ConnectionPool } from '@app/sockets/connection-pool';
import { DeviceConnection } from '@app/sockets/connection';
import { DevicesService } from '@app/modules/devices/services/devices.service';

@Injectable()
export class GeofenceService {
  constructor(
    private readonly deviceService: DevicesService,
    @Inject(forwardRef(() => ConnectionPool))
    private readonly connectionPool: ConnectionPool,
  ) {}

  public async findAll(payload: FindGeofencePayload, companyFilter: any) {}

  public async findOne(id: string, companyFilter: any) {}

  public async create(data: CreateGeofencePayload, companyFilter: any) {}

  public async update(id: string, data: UpdateGeofencePayload) {}

  private static getConnectionOrFail(deviceId: string): DeviceConnection {
    return null;
  }

  public async delete(id: string, companyFilter: any) {}

  public async findEvents(payload: GetEventsPayload, companyFilter: any) {}
}
