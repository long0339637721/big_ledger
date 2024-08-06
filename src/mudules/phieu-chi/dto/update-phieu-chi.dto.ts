import { PartialType } from '@nestjs/mapped-types';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
} from './create-phieu-chi.dto';

export class UpdatePhieuChiTienMatDto extends PartialType(
  CreatePhieuChiTienMatDto,
) {}

export class UpdatePhieuChiTienGuiDto extends PartialType(
  CreatePhieuChiTienGuiDto,
) {}
