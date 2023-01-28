import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(
  PickType(CreateCarDto, ['device', 'driver']),
) {}
