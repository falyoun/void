import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtRefreshGuard } from '@app/modules/registration/guards/jwt-refresh.guard';
import { GetUser } from '@app/modules/registration/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { Driver } from '../models/driver.model';
import { DriversService } from '../drivers.service';
import { CreateDriverPayload } from '../payloads/create-driver.payload';
import { QueryDriversPayload } from '../payloads/query-drivers.payload';
import { UpdateDriverPayload } from '../payloads/update-driver.payload';

@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  async createDriver(@Args('payload') payload: CreateDriverPayload) {
    return await this.driversService.createOne(payload);

  }

  @Query(() => [Driver])
  async allDrivers(
    @Args() queryDriversArgsPayload: QueryDriversPayload,
  ): Promise<Driver[]> {
    return await this.driversService.findAll(queryDriversArgsPayload);
  }

  @Mutation(() => Driver)
  @UseGuards(JwtRefreshGuard)
  async updateDriver(
    @Args('payload') payload: UpdateDriverPayload,
    @GetUser() user,
  ) {
    return await this.driversService.updateOne(user, payload);
  }

  // delete driver
  @Mutation(() => Driver)
  @UseGuards(JwtRefreshGuard)
  async deleteDriver(@GetUser() user) {
    return await this.driversService.deleteOne(user);
  }
}
