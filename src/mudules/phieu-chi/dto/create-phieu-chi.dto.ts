import { ApiProperty } from '@nestjs/swagger';
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
} from 'class-validator';

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
