import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportCpmhDto {
  @ApiProperty({ type: 'date', example: '2024-09-01' })
  @IsDateString(undefined, { message: 'Ngày bắt đầu không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: Date;

  @ApiProperty({ type: 'date', example: '2024-09-30' })
  @IsDateString(undefined, { message: 'Ngày kết thúc không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  endDate: Date;

  @ApiProperty({ type: 'string', example: 'Báo cáo CPMH tháng 9' })
  @IsNotEmpty({ message: 'Tên báo cáo không được để trống' })
  @IsString({ message: 'Tên báo cáo không hợp lệ' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Báo cáo Chi phí mua hàng tháng 9' })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả không hợp lệ' })
  description: string;
}
