import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Device } from '@app/modules/devices/models/device.model';

@Resolver()
export class DevicesResolver {
  @Mutation(() => Device)
  device() {}

  @Mutation(() => Device)
  updateDevice() {}

  @Query(() => [Device])
  devices() {
    return [];
  }

  @Query(() => Device)
  deviceById() {
    return {};
  }

  @Mutation(() => Boolean)
  deleteDevice() {}
}
