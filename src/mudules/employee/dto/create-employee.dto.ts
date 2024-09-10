import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsStrongPassword,
  IsBoolean,
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

  @ApiProperty({ example: false })
  @IsNotEmpty({ message: 'Is Admin is required' })
  @IsBoolean({ message: 'Is Admin is not valid' })
  isAdmin: boolean;
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
