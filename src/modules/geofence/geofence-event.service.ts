import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateGeofenceEventDto } from './dto/create-event.dto';
import { GeofenceService } from './geofence.service';
import { GeofenceEvent } from './models/geofence-event.model';

@Injectable()
export class GeofenceEventService {
  constructor(
    @Inject(forwardRef(() => GeofenceService))
    private geofenceService: GeofenceService,
    private geofenceEventModel: Model<GeofenceEvent>,
  ) {}
  public async create(dtos: CreateGeofenceEventDto[]) {
    await this.geofenceEventModel.bulkSave(
      dtos.map(
        (dto) =>
          new this.geofenceEventModel({
            geofence: dto.geofence,
            eventType: dto.eventType,
            device: dto.device._id,
            company: dto.device.company,
          }),
      ),
    );
  }
}
