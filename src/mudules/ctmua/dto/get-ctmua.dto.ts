import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { PAYMENT_STATUS, PaymentStatusType } from 'src/constants';

export class GetCtmuaDto {
  @ApiProperty({ example: '2024-09-01' })
  @IsDateString(undefined, { message: 'startDate must be a date string' })
  @IsNotEmpty({ message: 'startDate is required' })
  startDate: string;

  @ApiProperty({ example: '2024-09-31' })
  @IsDateString(undefined, { message: 'endDate must be a date string' })
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: string;

  @ApiPropertyOptional({ example: ['NOT_PAID'] })
  @IsIn(Object.values(PAYMENT_STATUS), {
    message: 'Payment status is not valid',
    each: true,
  })
  @IsArray({ message: 'paymentStatus must be an array' })
  @IsOptional()
  paymentStatus?: PaymentStatusType[] = [
    PAYMENT_STATUS.PAID,
    PAYMENT_STATUS.BEING_PAID,
    PAYMENT_STATUS.NOT_PAID,
  ];
}
