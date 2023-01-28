import { GpsElement } from 'codecs-sdk';
import { CarStatus } from '@app/sockets/packet-utils';

export class LivePreviewDataModel {
  gps: GpsElement;
  carStatus: CarStatus;
  deviceIMEI: string;
  timestamp: Date;
}
