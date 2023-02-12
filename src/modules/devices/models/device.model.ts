import { CarStatus } from '@app/sockets/packet-utils';
import { GpsElement } from 'codecs-sdk';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  IMEI: string;

  vehicles: any[];
  vehicle?: any;

  lastLocation?: GpsElement;
  lastCarStatus?: CarStatus;
}
