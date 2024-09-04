import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { PHIEU_CHI_TYPE, PhieuChiType } from 'src/constants/phieu-chi-type';

class ChungTuCuaPhieuChiDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Số tiền không hợp lệ' })
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  money: number;

  @ApiProperty({ example: 'Nội dung' })
  @IsString({ message: 'Nội dung không hợp lệ' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID ctu bán không hợp lệ' })
  @IsNotEmpty({ message: 'ID ctu bán không được để trống' })
  ctmuaId: number;
}

export class CreatePhieuChiTienMatDto {
  @ApiProperty({ example: '2024-05-08' })
  @IsDateString(undefined, { message: 'Ngày chi không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày chi không được để trống' })
  paymentDate: Date;

  @ApiProperty({ example: 'Nội dung' })
  @IsString({ message: 'Nội dung không hợp lệ' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'Người nhận' })
  @IsString({ message: 'Người nhận không hợp lệ' })
  @IsOptional()
  receiver?: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Nhà cung cấp không hợp lệ' })
  @IsNotEmpty({ message: 'ID Nhà cung cấp không được để trống' })
  supplierId: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Nhân viên không hợp lệ' })
  @IsNotEmpty({ message: 'ID Nhân viên không được để trống' })
  purchasingOfficerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Tài khoản ngân hàng không hợp lệ' })
  @IsNotEmpty({ message: 'ID Tài khoản ngân hàng không được để trống' })
  bankAccountId: number;

  @ApiProperty({
    type: [ChungTuCuaPhieuChiDto],
    description: 'List of products',
    example: [{ money: 1000, content: 'Nội dung', ctmuaId: 1 }],
  })
  @IsArray({ message: 'Chứng từ không hợp lệ' })
  @ArrayNotEmpty({ message: 'Chứng từ không được để trống' })
  @ValidateNested({ each: true })
  @Type(() => ChungTuCuaPhieuChiDto)
  chungTu: ChungTuCuaPhieuChiDto[];
}

export class CreatePhieuChiTienGuiDto {
  @ApiProperty({ example: '2024-05-08' })
  @IsDateString(undefined, { message: 'Ngày chi không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày chi không được để trống' })
  paymentDate: Date;

  @ApiProperty({ example: 'Nội dung' })
  @IsString({ message: 'Nội dung không hợp lệ' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'Người nhận' })
  @IsString({ message: 'Người nhận không hợp lệ' })
  @IsOptional()
  receiver?: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Nhà cung cấp không hợp lệ' })
  @IsNotEmpty({ message: 'ID Nhà cung cấp không được để trống' })
  supplierId: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Nhân viên không hợp lệ' })
  @IsNotEmpty({ message: 'ID Nhân viên không được để trống' })
  purchasingOfficerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Tài khoản ngân hàng không hợp lệ' })
  @IsNotEmpty({ message: 'ID Tài khoản ngân hàng không được để trống' })
  bankAccountId: number;

  @ApiProperty({
    type: [ChungTuCuaPhieuChiDto],
    description: 'List of products',
    example: [{ money: 1000, content: 'Nội dung', ctmuaId: 1 }],
  })
  @IsArray({ message: 'Chứng từ không hợp lệ' })
  @ArrayNotEmpty({ message: 'Chứng từ không được để trống' })
  @ValidateNested({ each: true })
  @Type(() => ChungTuCuaPhieuChiDto)
  chungTu: ChungTuCuaPhieuChiDto[];
}

export class CreatePhieuChiKhacDto {
  @ApiProperty({ example: '2024-05-08' })
  @IsDateString(undefined, { message: 'Ngày chi không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày chi không được để trống' })
  paymentDate: Date;

  @ApiProperty({ example: 'Nội dung' })
  @IsString({ message: 'Nội dung không hợp lệ' })
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 1000000 })
  @IsNumber({}, { message: 'Số tiền không hợp lệ' })
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  money: number;

  @ApiProperty({ example: PHIEU_CHI_TYPE.SALARY_COSTS })
  @IsIn(Object.values(PHIEU_CHI_TYPE), {
    message: 'Loại phiếu chi không hợp lệ',
  })
  @IsNotEmpty({ message: 'Loại phiếu chi không được để trống' })
  type: PhieuChiType;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'ID Kế toán không hợp lệ' })
  @IsNotEmpty({ message: 'ID Kế toán không được để trống' })
  accountantId: number;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'Thông tin không được để trống' })
  @IsBoolean({ message: 'Thông tin không hợp lệ' })
  isTienMat: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber({}, { message: 'ID Tài khoản ngân hàng không hợp lệ' })
  @IsOptional()
  bankAccountId?: number;
}
