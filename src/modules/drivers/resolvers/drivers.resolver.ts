import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Driver } from '@app/modules/drivers/models/driver.model';

@Resolver()
export class DriversResolver {
  @Mutation(() => Driver)
  device() {}

  @Mutation(() => Driver)
  updateDevice() {}

  @Query(() => [Driver])
  devices() {
    return [];
  }

  @Query(() => Driver)
  deviceById() {
    return {};
  }

  @Mutation(() => Boolean)
  deleteDevice() {}
}
