import { CreateDriverDto } from './create-driver.dto';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class UpdateDriverDto extends PartialType(PickType(CreateDriverDto, ['car'])) {}
