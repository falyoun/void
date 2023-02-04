import { Types } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { CarStatus } from '@app/sockets/packet-utils';
import { GpsElement } from 'codecs-sdk';

@Schema({ timestamps: true })
export class Device {
  _id: Types.ObjectId;

  name: string;

  IMEI: string;

  cars: Types.ObjectId[];
  car?: Types.ObjectId;
  lastLocation?: GpsElement;
  lastCarStatus?: CarStatus;
}
