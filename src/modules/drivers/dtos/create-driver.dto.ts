import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDriverDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  company: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  emirateId: string;

  @Expose()
  @IsOptional()
  @IsMongoId()
  car?: string;
}
