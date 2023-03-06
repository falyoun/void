import { Geofence } from '../models/geofence.model';
import { GeofenceEventType } from '@app/modules/geofence/enums';

export class CreateGeofenceEventPayload {
  geofence: Geofence;
  device: any;
  eventType: GeofenceEventType;
}
