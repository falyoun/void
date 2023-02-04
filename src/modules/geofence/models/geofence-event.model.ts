import { GeofenceEventType } from '@app/modules/geofence/enums';
import { Geofence } from '@app/modules/geofence/models/geofence.model';
import { Device } from '@app/modules/devices/models/device.model';

export class GeofenceEvent {
  eventType: GeofenceEventType;
  geofence: Geofence;
  device: Device;
}
