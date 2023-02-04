import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GeofenceDeviceFilter {
  @IsMongoId()
  @ApiProperty({ default: '6151cb796da81366e98b466f' })
  deviceId: string;
}
