import { Field, ObjectType } from '@nestjs/graphql';
import { Vehicle } from '@app/modules/vehicles/models/vehicles.model';

@ObjectType()
export class VehicleProfile {
  @Field()
  id: string;

  @Field()
  vehicle_id: string;

  @Field()
  vehicleTake: string;

  @Field()
  vehicleModel: string;

  @Field()
  vehicleYear: string;

  @Field()
  vehicleColor: string;

  @Field()
  vehiclePlate: string;

  @Field()
  vehicleCapacity: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;

  @Field(() => Vehicle)
  vehicle: Vehicle;
}
