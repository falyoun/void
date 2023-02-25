import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Vehicle } from './models/vehicles.model';
import { TripsService } from '@app/modules/trips/trips.service';
import { DriversService } from '@app/modules/drivers/drivers.service';
import { DevicesService } from '@app/modules/devices/services/devices.service';
import { UpdateVehiclePayload } from '@app/modules/vehicles/payloads/update-vehicle.payload';
import { CreateVehiclePayload } from '@app/modules/vehicles/payloads/create-vehicle.payload';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly tripsService: TripsService,
    private readonly driversService: DriversService,
    @Inject(forwardRef(() => DevicesService))
    private readonly devicesService: DevicesService,
  ) {}

  findOne() {}

  async findAllWithTrips(collectionPayload: any) {}

  findAll(collectionPayload: any) {}

  createOne(payload: CreateVehiclePayload) {}

  updateOne(payload: UpdateVehiclePayload) {}

  removeOne() {}
}
