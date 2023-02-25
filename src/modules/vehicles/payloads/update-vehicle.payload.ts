import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateVehiclePayload } from './create-vehicle.payload';

export class UpdateVehiclePayload extends PartialType(
  PickType(CreateVehiclePayload, ['device', 'driver']),
) {}
