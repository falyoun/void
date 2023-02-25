import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateDevicePayload } from './create-device.payload';

export class UpdateDevicePayload extends PartialType(PickType(CreateDevicePayload, ['car'])) {}
