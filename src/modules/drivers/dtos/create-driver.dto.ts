import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDriverDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  company: Types.ObjectId;

  @Expose()
  @IsNotEmpty()
  @IsString()
  emirateId: string;

  @Expose()
  @IsOptional()
  @IsMongoId()
  car?: Types.ObjectId;
}
