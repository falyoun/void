import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import {
  CreateGeofencePayload,
  GeofenceLocationOnlyPayload,
  OtherGeofencePropsPayload,
} from './create-geofence.payload';

export class UpdateGeofencePayload extends PartialType(
  OmitType(OtherGeofencePropsPayload, ['deviceId'] as const),
) {
  @ValidateNested()
  locationInfo: GeofenceLocationOnlyPayload;
}
