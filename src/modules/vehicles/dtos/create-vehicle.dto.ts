import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVehicleDto {
  @Expose()
  @IsNotEmpty()
  company: string;

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
  device?: string;

  @Expose()
  @IsOptional()
  driver?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  plateNumber: string;
}
