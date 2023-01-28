import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Driver } from '@app/modules/drivers/models/driver.model';
import { UpdateDriverDto } from '@app/modules/drivers/dtos/update-driver.dto';
import { CreateDriverDto } from '@app/modules/drivers/dtos/create-driver.dto';
import { CarsService } from '@app/modules/cars/cars.service';

@Injectable()
export class DriversService {
  constructor(
    private readonly driversModel: Driver,
    @Inject(forwardRef(() => CarsService))
    private readonly carsService: CarsService,
  ) {}

  findOne(filter: FilterQuery<Driver>) {}

  findAll() {}

  createOne(dto: CreateDriverDto) {}

  updateOne(filter: FilterQuery<Driver>, dto: UpdateDriverDto) {}

  deleteOne(filter: FilterQuery<Driver>) {}
}
