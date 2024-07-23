import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class ProductOfCtmua {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Count must be a number' })
  @IsNotEmpty({ message: 'Count is required' })
  @Min(1, { message: 'Count must be greater than or equal to 1' })
  count: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Product id must be a number' })
  @IsNotEmpty({ message: 'Product id is required' })
  productId: number;
}

export class CreateCtmuaDto {
  @ApiProperty({ example: '2021-09-01' })
  @IsDateString(undefined, { message: 'Ngay Nhan must be a date string' })
  @IsNotEmpty({ message: 'Ngay Nhan is required' })
  deliveryDate: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'WarehouseKeeper id must be a number' })
  @IsNotEmpty({ message: 'WarehouseKeeper id is required' })
  warehouseKeeperId: number;

  @ApiProperty({ example: 'Content' })
  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'Shipper' })
  @IsString({ message: 'Shipper must be a string' })
  @IsOptional()
  shipper?: string;

  @ApiProperty({ example: '2021-09-01' })
  @IsDateString(undefined, { message: 'PaymentTerm must be a date string' })
  @IsNotEmpty({ message: 'PaymentTerm is required' })
  paymentTerm: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'DonMuaHang must be a numbers' })
  @IsNotEmpty({ message: 'DonMuaHangIds is required' })
  donMuaHangId: number;

  @ApiProperty({
    type: [ProductOfCtmua],
    description: 'List of products',
    example: [{ productId: 1, count: 1 }],
  })
  @IsArray({ message: 'Products must be an array' })
  @ArrayNotEmpty({ message: 'Products must not be empty' })
  @IsNotEmpty({ message: 'Products is required' })
  @ValidateNested({
    each: true,
    message: 'Each product must be an object of ProductOfCtmua',
  })
  @Type(() => ProductOfCtmua)
  products: ProductOfCtmua[];
}
