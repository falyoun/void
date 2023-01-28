import { Geofence } from '../models/geofence.model';
import { GeofenceEventType } from '@app/modules/geofence/enums';

export class CreateGeofenceEventDto {
  geofence: Geofence;
  device: any;
  eventType: GeofenceEventType;
}
