import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Driver } from '@app/modules/drivers/models/driver.model';
import { Device } from '@app/modules/devices/models/device.model';

@Schema({ timestamps: true })
export class Car {
  _id: string;
  carModel: string;
  manufacturingYear: Date;
  plateNumber: string;

  // Relations section

  // driver?: Driver | Types.ObjectId;

  drivers: Driver[];
  device?: Device;
  devices: Device[];
}
