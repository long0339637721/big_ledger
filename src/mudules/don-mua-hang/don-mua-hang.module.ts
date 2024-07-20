import { Module } from '@nestjs/common';
import { DonMuaHangService } from './don-mua-hang.service';
import { DonMuaHangController } from './don-mua-hang.controller';
import { DonMuaHangRepository } from './don-mua-hang.repository';
import { SupplierModule } from '../supplier/supplier.module';
import { EmployeeModule } from '../employee/employee.module';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [DonMuaHangController],
  providers: [DonMuaHangService, DonMuaHangRepository],
  exports: [DonMuaHangService],
  imports: [SupplierModule, EmployeeModule, ProductModule],
})
export class DonMuaHangModule {}
