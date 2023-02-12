import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Driver } from '@app/modules/drivers/models/driver.model';
import { UpdateDriverDto } from '@app/modules/drivers/dtos/update-driver.dto';
import { CreateDriverDto } from '@app/modules/drivers/dtos/create-driver.dto';
import { VehiclesService } from '@app/modules/vehicles/services/vehicles.service';

@Injectable()
export class DriversService {
  constructor(
    @Inject(forwardRef(() => VehiclesService))
    private readonly carsService: VehiclesService,
  ) {}

  findOne(filter: any) {}

  findAll() {}

  createOne(dto: CreateDriverDto) {}

  updateOne(filter: Driver, dto: UpdateDriverDto) {}

  deleteOne(filter: Driver) {}
}
