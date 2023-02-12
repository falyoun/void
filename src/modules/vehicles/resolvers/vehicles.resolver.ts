import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Vehicle } from '@app/modules/vehicles/models/vehicles.model';

@Resolver()
export class VehiclesResolver {
  @Mutation(() => Vehicle)
  device() {}

  @Mutation(() => Vehicle)
  updateDevice() {}

  @Query(() => [Vehicle])
  devices() {
    return [];
  }

  @Query(() => Vehicle)
  deviceById() {
    return {};
  }

  @Mutation(() => Boolean)
  deleteDevice() {}
}
