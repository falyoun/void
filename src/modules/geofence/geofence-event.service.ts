import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGeofenceEventPayload } from './payloads/create-event.payload';
import { GeofenceService } from './geofence.service';
import { GeofenceEvent } from './models/geofence-event.model';

@Injectable()
export class GeofenceEventService {
  constructor(
    @Inject(forwardRef(() => GeofenceService))
    private geofenceService: GeofenceService,
  ) {}
  public async create(payloads: CreateGeofenceEventPayload[]) {}
}
