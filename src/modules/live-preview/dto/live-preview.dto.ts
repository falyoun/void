import { GpsElement } from 'codecs-sdk';
import { CarStatus } from '@app/sockets/packet-utils';

export class LivePreviewDto {
  gps: GpsElement;
  carStatus: CarStatus;
  deviceIMEI: string;
}
