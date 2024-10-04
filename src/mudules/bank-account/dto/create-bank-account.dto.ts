import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateBankAccountDto {
  @ApiProperty({ example: '1234567890' })
  @IsString({ message: 'Account number must be a string ' })
  @IsNotEmpty({ message: 'Account number is required' })
  accountNumber: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString({ message: 'Account name must be a string ' })
  @IsNotEmpty({ message: 'Account name is required' })
  accountName: string;

  @ApiProperty({ example: 'Vietcombank' })
  @IsString({ message: 'Bank name must be a string ' })
  @IsNotEmpty({ message: 'Bank name is required' })
  bankName: string;

  @ApiProperty({ example: 'HCM' })
  @IsString({ message: 'Branch must be a string ' })
  @IsNotEmpty({ message: 'Branch is required' })
  branch: string;

  @ApiProperty({ example: 'Note' })
  @IsString({ message: 'Note must be a string ' })
  @IsOptional()
  note?: string;
}

export class CreateTransactionDto {
  @ApiProperty({ example: '2021-09-01' })
  @IsDateString(undefined, { message: 'Date must be a date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;

  @ApiProperty({ example: '1234567890' })
  @IsString({ message: 'Transaction number must be a string ' })
  @IsNotEmpty({ message: 'Transaction number is required' })
  transactionNumber: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString({ message: 'Recipient must be a string ' })
  @IsOptional()
  recipient?: string;

  @ApiProperty({ example: '1234567890' })
  @IsString({ message: 'Counter party account must be a string ' })
  @IsOptional()
  counterPartyAccount?: string;

  @ApiProperty({ example: 'Vietcombank' })
  @IsString({ message: 'Counter party bank must be a string ' })
  @IsOptional()
  counterPartyBank?: string;

  @ApiProperty({ example: 1000000 })
  @IsNumber({}, { message: 'Debit must be a number' })
  @IsOptional()
  debit: number = 0;

  @ApiProperty({ example: 1000000 })
  @IsNumber({}, { message: 'Credit must be a number' })
  @IsOptional()
  credit: number = 0;

  @ApiProperty({ example: 'Description' })
  @IsString({ message: 'Description must be a string ' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 0 })
  @IsNumber({}, { message: 'Transaction fee id must be a number' })
  @IsOptional()
  transactionFeeId?: number = 0;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Bank account id must be a number' })
  @IsNotEmpty({ message: 'Bank account id is required' })
  bankAccountId: number;
}

export class CreateTransactionsDto {
  @ApiProperty({
    type: [CreateTransactionDto],
    description: 'List of transactions',
    example: [
      {
        date: '2021-09-01',
        transactionNumber: '1234567890',
        recipient: 'Nguyen Van A',
        counterPartyAccount: '1234567890',
        counterPartyBank: 'Vietcombank',
        debit: 1000000,
        credit: 0,
        description: 'Description',
        bankAccountId: 1,
      },
    ],
  })
  @IsArray({ message: 'Transactions must be an array' })
  @ArrayNotEmpty({ message: 'Transactions must not be empty' })
  @IsNotEmpty({ message: 'Transactions is required' })
  @ValidateNested({
    each: true,
    message: 'Each transaction must be an object of CreateTransactionDto',
  })
  @Type(() => CreateTransactionDto)
  transactions: CreateTransactionDto[];
}
