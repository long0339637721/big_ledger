import { Module } from '@nestjs/common';
import { PhieuChiService } from './phieu-chi.service';
import {
  PhieuChiTienMatController,
  PhieuChiTienGuiController,
  PhieuChiKhacController,
} from './phieu-chi.controller';
import { PhieuChiRepository } from './phieu-chi.repository';
import { CtmuaModule } from '../ctmua/ctmua.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { EmployeeModule } from '../employee/employee.module';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  controllers: [
    PhieuChiTienMatController,
    PhieuChiTienGuiController,
    PhieuChiKhacController,
  ],
  providers: [PhieuChiService, PhieuChiRepository],
  exports: [PhieuChiService],
  imports: [CtmuaModule, SupplierModule, BankAccountModule, EmployeeModule],
})
export class PhieuChiModule {}
