import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetPhieuChiDto extends PageOptionsDto {
  @ApiProperty({ example: '2024-09-01' })
  @IsDateString(undefined, { message: 'startDate must be a date string' })
  @IsNotEmpty({ message: 'startDate is required' })
  startDate: string;

  @ApiProperty({ example: '2024-09-31' })
  @IsDateString(undefined, { message: 'endDate must be a date string' })
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: string;
}
