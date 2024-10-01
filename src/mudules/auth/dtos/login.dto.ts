import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email is not empty' })
  @IsEmail(undefined, { message: 'email is not valid' })
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @IsNotEmpty({ message: 'password is not empty' })
  @IsString({ message: 'password must be a string' })
  @ApiProperty({ example: 'Password@1' })
  password: string;
}
