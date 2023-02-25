import { GpsElement } from 'codecs-sdk';
import { CarStatus } from '@app/sockets/packet-utils';

export class LivePreviewPayload {
  gps: GpsElement;
  carStatus: CarStatus;
  deviceIMEI: string;
}
