import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

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
  @IsNotEmpty()
  company: Types.ObjectId;

  @Expose()
  @IsMongoId()
  @IsOptional()
  car?: Types.ObjectId;
}
