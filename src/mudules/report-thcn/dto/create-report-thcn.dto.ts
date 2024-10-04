import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportThcnDto {
  @ApiProperty({ type: 'date', example: '2021-09-01' })
  @IsDateString(undefined, { message: 'Ngày bắt đầu không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: Date;

  @ApiProperty({ type: 'date', example: '2021-09-30' })
  @IsDateString(undefined, { message: 'Ngày kết thúc không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  endDate: Date;

  @ApiProperty({ type: 'string', example: 'Báo cáo THCN tháng 9' })
  @IsNotEmpty({ message: 'Tên báo cáo không được để trống' })
  @IsString({ message: 'Tên báo cáo không hợp lệ' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Báo cáo THCN tháng 9' })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả không hợp lệ' })
  description: string;

  @ApiProperty({ type: 'array', example: [1, 2, 3] })
  // @IsNotEmpty({ message: 'Danh sách khách hàng không được để trống' })
  @IsArray({ message: 'Danh sách khách hàng không hợp lệ' })
  customerIds: number[];
}
