import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import {
  CreateGeofenceDto,
  GeofenceLocationOnlyDto,
  OtherGeofencePropsDto,
} from './create-geofence.dto';

export class UpdateGeofenceDto extends PartialType(
  OmitType(OtherGeofencePropsDto, ['deviceId'] as const),
) {
  @ValidateNested()
  locationInfo: GeofenceLocationOnlyDto;
}
