import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(PickType(CreateDeviceDto, ['car'])) {}
