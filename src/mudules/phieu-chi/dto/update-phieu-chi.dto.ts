import { PartialType } from '@nestjs/mapped-types';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
  CreatePhieuChiKhacDto,
} from './create-phieu-chi.dto';

export class UpdatePhieuChiTienMatDto extends PartialType(
  CreatePhieuChiTienMatDto,
) {}

export class UpdatePhieuChiTienGuiDto extends PartialType(
  CreatePhieuChiTienGuiDto,
) {}

export class UpdatePhieuChiKhacDto extends PartialType(CreatePhieuChiKhacDto) {}
