import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateVehicleDto {
  @Expose()
  @IsNotEmpty()
  @IsMongoId()
  company: Types.ObjectId;

  @Expose()
  @IsString()
  @IsNotEmpty()
  carModel: string;

  @Expose()
  @IsDateString()
  @IsNotEmpty()
  manufacturingYear: Date;

  @Expose()
  @IsOptional()
  @IsMongoId()
  device?: Types.ObjectId;

  @Expose()
  @IsOptional()
  @IsMongoId()
  driver?: Types.ObjectId;

  @Expose()
  @IsNotEmpty()
  @IsString()
  plateNumber: string;
}
