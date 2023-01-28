import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Car } from './models';
import { TripsService } from '@app/modules/trips/trips.service';
import { DriversService } from '@app/modules/drivers/drivers.service';
import { DevicesService } from '@app/modules/devices/devices.service';
import { UpdateCarDto } from '@app/modules/cars/dtos/update-car.dto';
import { CreateCarDto } from '@app/modules/cars/dtos/create-car.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsModel: Car,
    private readonly tripsService: TripsService,
    private readonly driversService: DriversService,
    @Inject(forwardRef(() => DevicesService))
    private readonly devicesService: DevicesService,
  ) {}

  findOne(filterQuery: FilterQuery<Car>) {}

  async findAllWithTrips(collectionDto: any) {}

  findAll(collectionDto: any) {}

  createOne(dto: CreateCarDto) {}

  updateOne(filter: FilterQuery<Car>, dto: UpdateCarDto) {}

  removeOne(filter: FilterQuery<Car>) {}
}
