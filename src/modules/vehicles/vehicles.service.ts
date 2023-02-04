import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Vehicle } from './models/vehicles.model';
import { TripsService } from '@app/modules/trips/trips.service';
import { DriversService } from '@app/modules/drivers/drivers.service';
import { DevicesService } from '@app/modules/devices/devices.service';
import { UpdateVehicleDto } from '@app/modules/vehicles/dtos/update-vehicle.dto';
import { CreateVehicleDto } from '@app/modules/vehicles/dtos/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly tripsService: TripsService,
    private readonly driversService: DriversService,
    @Inject(forwardRef(() => DevicesService))
    private readonly devicesService: DevicesService,
  ) {}

  findOne(filterQuery: FilterQuery<Vehicle>) {}

  async findAllWithTrips(collectionDto: any) {}

  findAll(collectionDto: any) {}

  createOne(dto: CreateVehicleDto) {}

  updateOne(filter: FilterQuery<Vehicle>, dto: UpdateVehicleDto) {}

  removeOne(filter: FilterQuery<Vehicle>) {}
}
