import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(
  PickType(CreateVehicleDto, ['device', 'driver']),
) {}
