import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export enum GeofenceTypeEnum {
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
}

export class GeofenceLocationOnlyPayload {
  @IsEnum(GeofenceTypeEnum)
  @ApiProperty()
  shapeType: string;

  @IsNumber()
  @Min(-179.99999999)
  @Max(179.99999999)
  @ApiProperty()
  x1: number;

  @IsNumber()
  @Min(-89.99999999)
  @Max(89.99999999)
  @ApiProperty()
  y1: number;

  @IsNumber()
  @Min(1)
  @ValidateIf((o) => o.shapeType == GeofenceTypeEnum.CIRCLE)
  @ApiPropertyOptional()
  radius?: number;

  @IsNumber()
  @Min(-179.99999999)
  @Max(179.99999999)
  @ValidateIf((o) => o.shapeType == GeofenceTypeEnum.RECTANGLE)
  @ApiPropertyOptional()
  x2?: number;

  @IsNumber()
  @Min(-89.99999999)
  @Max(89.99999999)
  @ValidateIf((o) => o.shapeType == GeofenceTypeEnum.RECTANGLE)
  @ApiPropertyOptional()
  y2?: number;
}

export class OtherGeofencePropsPayload {
  @IsString()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  enable = true;

  @IsMongoId()
  @ApiProperty({ default: '6151cb796da81366e98b466f' })
  deviceId: string;
}

export class CreateGeofencePayload extends IntersectionType(
  OtherGeofencePropsPayload,
  GeofenceLocationOnlyPayload,
) {}
