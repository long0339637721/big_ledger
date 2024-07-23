import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class AddProductDto {
  @ApiProperty({ example: [1] })
  @IsNumber({}, { each: true, message: 'ProductIds id is not valid' })
  @IsNotEmpty({ message: 'ProductIds id is required' })
  @ArrayNotEmpty({ message: 'ProductIds id is required' })
  @ArrayMinSize(1, { message: 'ProductIds id is required' })
  @IsArray({ message: 'ProductIds id is not valid' })
  productIds: number[];
}
