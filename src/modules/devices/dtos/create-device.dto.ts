import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  IMEI: string;

  @Expose()
  @IsMongoId()
  @IsOptional()
  car?: any;
}
