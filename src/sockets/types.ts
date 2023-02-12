import { LivePreviewWsg } from '@app/web-socket-gateways/live-preview-wsg';
import { TripsService } from '@app/modules/trips/trips.service';
import { GeofenceEventService } from '@app/modules/geofence/geofence-event.service';
import { DevicesService } from '@app/modules/devices/services/devices.service';
import { AvlPacketsService } from '@app/modules/avl-packets/avl-packets.service';

export type ReconnectionConfig = {
  retryAttempts: number;
  retryInterval: number;
};

export class ConnectionServices {
  device: DevicesService;
  liveGateway: LivePreviewWsg;
  avlPacket: AvlPacketsService;
  tripService: TripsService;
  geofenceEvent: GeofenceEventService;
}

export type SetParameterData = {
  parameterId: number;
  value: string;
};

export type DeviceCommand = Buffer;
