import { Driver } from '@app/modules/drivers/models/driver.model';
import { Device } from '@app/modules/devices/models/device.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { VehicleProfile } from '@app/modules/vehicles/models/vehicle-profile.model';
import { VehicleStatus } from '@app/modules/vehicles/enums/vehicle-status.enum';

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

  @Field()
  vehicleNumber: string;

  @Field()
  vehicleStatus: VehicleStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;

  @Field(() => VehicleProfile)
  profile: VehicleProfile;

  @Field(() => [Driver])
  driver?: Driver;

  @Field(() => [Driver])
  drivers: Driver[];

  @Field(() => Device)
  device?: Device;

  @Field(() => [Device])
  devices: Device[];
}
