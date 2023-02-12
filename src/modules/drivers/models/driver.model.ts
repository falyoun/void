import { Vehicle } from '@app/modules/vehicles/models/vehicles.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Driver {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field(() => Vehicle)
  vehicle?: Vehicle;
  @Field(() => [Vehicle])
  vehicles: Vehicle[];
}
