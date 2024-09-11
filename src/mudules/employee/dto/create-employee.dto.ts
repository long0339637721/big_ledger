import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsIn,
  IsStrongPassword,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE, UserRoleType } from 'src/constants';

abstract class CreateEmployeeDto {
  @ApiProperty({ example: 'Accountant A' })
  @IsString({ message: 'Name is not valid' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: 'Phone is not valid' })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @ApiProperty({ example: 'Address A' })
  @IsString({ message: 'Address is not valid' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;
}

export class CreateAccountantDto extends CreateEmployeeDto {
  @ApiProperty({ example: 'Password@1' })
  @IsString({ message: 'Password is not valid' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',
    },
  )
  password: string;

  @ApiProperty({ example: 'avatar' })
  @IsString({ message: 'Avatar is not valid' })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'Is Admin is required' })
  @IsBoolean({ message: 'Is Admin is not valid' })
  isAdmin: boolean;

  @ApiProperty({ example: 'Company Name' })
  @IsString({ message: 'Company Name is not valid' })
  @IsOptional()
  companyName?: string;

  @ApiProperty({ example: 'Company Address' })
  @IsString({ message: 'Company Address is not valid' })
  @IsOptional()
  companyAddress?: string;

  @ApiProperty({ example: 'Company Phone' })
  @IsString({ message: 'Company Phone is not valid' })
  @IsOptional()
  companyPhone?: string;

  @ApiProperty({ example: 'CompanyEmail@gmail.com' })
  @IsEmail({}, { message: 'Company Email is not valid' })
  @IsOptional()
  companyEmail?: string;

  @ApiProperty({ example: 'Company Logo' })
  @IsString({ message: 'Company Logo is not valid' })
  @IsOptional()
  companyLogo?: string;

  @ApiProperty({ example: 'Company Tax Code' })
  @IsString({ message: 'Company Tax Code is not valid' })
  @IsOptional()
  companyTaxCode?: string;

  @ApiProperty({ example: 'Company Representative' })
  @IsString({ message: 'Company Representative is not valid' })
  @IsOptional()
  companyRepresentative?: string;

  @ApiProperty({ example: 3 })
  @IsNumber({}, { message: 'First Announce is not valid' })
  @Min(1, { message: 'First Announce is not valid' })
  @IsOptional()
  firstAnnounce?: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Second Announce is not valid' })
  @Min(1, { message: 'Second Announce is not valid' })
  @IsOptional()
  secondAnnounce?: number;
}

export class CreateOtherEmployee extends CreateEmployeeDto {
  @ApiProperty({
    example: USER_ROLE.ADMIN,
    type: 'enum',
    enum: Object.values(USER_ROLE),
  })
  @IsIn(
    [
      USER_ROLE.PURCHARSING_OFFICER,
      USER_ROLE.SALESPERSON,
      USER_ROLE.WAREHOUSE_KEEPER,
    ],
    { message: 'Role is not valid' },
  )
  @IsString({ message: 'Role is not valid' })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRoleType;
}

export class CreateSalespersonDto extends CreateEmployeeDto {}

export class CreatePurchasingOfficerDto extends CreateEmployeeDto {}

export class CreateWarehouseKeeperDto extends CreateEmployeeDto {}

export class CreateAdminDto extends CreateEmployeeDto {}
