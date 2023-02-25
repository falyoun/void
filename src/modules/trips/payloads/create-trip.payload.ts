import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { CarStatus } from '@app/sockets/packet-utils';
import { GpsElement } from 'codecs-sdk';
import { Device } from '@app/modules/devices/models/device.model';

export type TripStep = {
  gps: GpsElement & { address: string };
  timestamp: Date;
  carStatus: CarStatus;
};

export class CreateTripPayload {
  @Expose()
  @Allow()
  steps: TripStep[];

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  minSpeed: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  sumSpeed: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  countSpeed: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  maxSpeed: number;

  @IsNotEmpty()
  @Expose()
  movingDuration: number;

  @IsNotEmpty()
  @Expose()
  idleDuration: number;

  @IsNotEmpty()
  @Expose()
  distance: number;

  @Expose()
  @Allow()
  device: Device;
}
