import { User } from '@app/modules/users/models/user.model';
import { Vehicle } from '@app/modules/vehicles/models/vehicles.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Driver' })
export class Driver {
  @Field()
  id: string;

  @Field()
  user: User;

  @Field()
  isRenting: boolean;

  // rent : Rent
}
