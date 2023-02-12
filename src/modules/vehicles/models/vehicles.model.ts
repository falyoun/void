import { Driver } from '@app/modules/drivers/models/driver.model';
import { Device } from '@app/modules/devices/models/device.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field()
  id: string;

  @Field()
  model: string;

  @Field()
  manufacturingYear: Date;

  @Field()
  plateNumber: string;

  @Field(() => [Driver])
  driver?: Driver;

  @Field(() => [Driver])
  drivers: Driver[];

  @Field(() => Device)
  device?: Device;

  @Field(() => [Device])
  devices: Device[];
}
