import { CarStatus } from '@app/sockets/packet-utils';
import { GpsElement } from 'codecs-sdk';

export class Device {
  _id: string;

  name: string;

  IMEI: string;

  cars: any[]
  car?: any;
  lastLocation?: GpsElement;
  lastCarStatus?: CarStatus;
}
