import { Module } from '@nestjs/common';
import { ReportNoPhaiTraService } from './report-no-phai-tra.service';
import { ReportNoPhaiTraController } from './report-no-phai-tra.controller';
import { ReportNoPhaiTraRepository } from './report-no-phai-tra.repository';
import { SupplierModule } from 'src/mudules/supplier/supplier.module';
import { CtmuaModule } from 'src/mudules/ctmua/ctmua.module';

@Module({
  controllers: [ReportNoPhaiTraController],
  providers: [ReportNoPhaiTraService, ReportNoPhaiTraRepository],
  exports: [ReportNoPhaiTraService],
  imports: [SupplierModule, CtmuaModule],
})
export class ReportNoPhaiTraModule {}
