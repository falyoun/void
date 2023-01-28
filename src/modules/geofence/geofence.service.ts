import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { FindGeofenceDto } from './dto/find-geofence.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { UpdateGeofenceDto } from './dto/update-geofence.dto';
import { GeofenceErrors } from './geofence.errors';
import { Geofence } from '@app/modules/geofence/models/geofence.model';
import { GeofenceEvent } from '@app/modules/geofence/models/geofence-event.model';
import { ConnectionPool } from '@app/sockets/connection-pool';
import { TcpCommandBuilder } from '@app/sockets/tcp/tcp-command-builder';
import { DeviceConnection } from '@app/sockets/connection';
import { DevicesService } from '@app/modules/devices/devices.service';
import { GeofenceCommandTools } from '@app/sockets/commands/geofence/builder';

@Injectable()
export class GeofenceService {
  constructor(
    private geofenceModel: Model<Geofence>,
    private geofenceEventModel: Model<GeofenceEvent>,
    private readonly deviceService: DevicesService,
    private readonly connectionPool: ConnectionPool,
  ) {}

  public async findAll(dto: FindGeofenceDto, companyFilter: any) {}

  public async findOne(id: string, companyFilter: any) {}

  public async create(
    data: CreateGeofenceDto,
    companyFilter: any,
  ): Promise<Geofence> {
    const deviceFilter = { _id: data.deviceId } as any;
    if (companyFilter.company) deviceFilter.company = companyFilter.company;
    const device = await this.deviceService.findOne(deviceFilter);
    const deviceConnection = this.getConnectionOrFail(data.deviceId);
    const existingSlots = (
      await this.geofenceModel
        .find({ device: data.deviceId }, { slot: 1, _id: 1 })
        .sort({ slot: 1 })
    ).map((geofence) => geofence.slot);
    let newSlot = -1;
    if (existingSlots.length == 0) newSlot = 1;
    else {
      for (let i = 0; i < existingSlots.length; i++) {
        if (i == 0 && existingSlots[i] != 1) newSlot = 1;
        else if (i > 0 && existingSlots[i] - existingSlots[i - 1] > 1) {
          newSlot = existingSlots[i - 1] + 1;
          break;
        }
      }
      if (newSlot == -1) newSlot = existingSlots[existingSlots.length - 1] + 1;
    }
    if (newSlot > 50)
      throw new BadRequestException(GeofenceErrors.SLOT_COUNT_EXCEEDED);
    delete data.deviceId;
    const geofence = new this.geofenceModel(data);
    geofence.slot = newSlot;
    // geofence.device = device.id;
    // geofence.company = device.company;
    await geofence.save();

    const cmdParamters = GeofenceCommandTools.buildGeofenceConfigs(geofence);
    const cmd = TcpCommandBuilder.buildSetParamCommand(cmdParamters);
    deviceConnection.sendCommand(cmd);

    return geofence;
  }

  public async update(
    id: string,
    data: UpdateGeofenceDto,
  ) {
    // const geofence = await this.findOne(id, companyFilter);
    // const deviceId = geofence.device?._id ?? geofence.device;
    // const connection = this.getConnectionOrFail(deviceId);
    // if (data.name) geofence.name = data.name;
    // if (data.enable) geofence.enable = data.enable;
    // Object.assign(geofence, data.locationInfo);
    // return await this.transactionsService.withTransaction(async (session) => {
    //   await geofence.save({ session });
    //
    //   const cmdParameters = GeofenceCommandTools.buildGeofenceConfigs(geofence);
    //   const cmd = TcpCommandBuilder.buildSetParamCommand(cmdParameters);
    //   connection.sendCommand(cmd);
    //
    //   return;
    // });
  }

  private getConnectionOrFail(deviceId: string): DeviceConnection {
    if (this.connectionPool.hasConnection(deviceId) == false) {
      throw new BadRequestException(GeofenceErrors.DEVICE_NOT_CONNECTED);
    }
    return this.connectionPool.getConnection(deviceId);
  }

  public async delete(id: string, companyFilter: any) {
    // const geofence = await this.findOne(id, companyFilter);
    // const connection = this.getConnectionOrFail(
    //   geofence.device?._id ?? geofence.device,
    // );
    // return this.transactionsService.withTransaction(async (session) => {
    //   await geofence.delete({ session });
    //   const cmdParameter = GeofenceCommandTools.setGeofenceEnableCommand(
    //     geofence.slot,
    //     false,
    //   );
    //   const cmd = TcpCommandBuilder.buildSetParamCommand([cmdParameter]);
    //   connection.sendCommand(cmd);
    // });
  }

  public async findEvents(dto: GetEventsDto, companyFilter: any) {
    // const query = this.geofenceEventModel.find({}).populate('device');
    // if (dto.deviceId) query.where({ 'device._id': dto.deviceId });
    // if (companyFilter.company)
    //   query.where({ 'device.company': companyFilter.company });
    // return new DocumentCollector(this.geofenceEventModel).findWithQuery(
    //   query,
    //   dto,
    // );
  }
}
