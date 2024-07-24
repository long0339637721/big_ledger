import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UNIT, UnitType } from '../../../constants';

export class CreateProductDto {
  @ApiProperty({ example: 'Product A' })
  @IsString({ message: 'Name is not valid' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'Description A' })
  @IsString({ message: 'Description is not valid' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1200 })
  @IsNumber(undefined, { message: 'PriceDelivery is not valid' })
  @IsNotEmpty({ message: 'PriceDelivery is required' })
  priceDelivery: number;

  @ApiProperty({ example: 'KG' })
  @IsString({ message: 'Unit is not valid' })
  @IsNotEmpty({ message: 'Unit is required' })
  @IsIn(Object.values(UNIT), { message: 'Unit is not valid' })
  unit: UnitType;

  @ApiProperty({ example: 1 })
  @IsNumber(undefined, { message: 'SupplierId is not valid' })
  @IsNotEmpty({ message: 'SupplierId is required' })
  productGroupId: number;
}

export class CreateProductGroupDto {
  @ApiProperty({ example: 'Product Group A' })
  @IsString({ message: 'Name is not valid' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'Description A' })
  @IsString({ message: 'Description is not valid' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 8 })
  @IsNumber(undefined, { message: 'Thue is not valid' })
  @IsNotEmpty({ message: 'Thue is required' })
  tax: number;
}
