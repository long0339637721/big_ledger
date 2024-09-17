import { Module } from '@nestjs/common';
import { ReportCostService } from './report-cost.service';
import { ReportCostController } from './report-cost.controller';
import { ReportCostRepository } from './report-cost.repository';
import { CtmuaModule } from '../ctmua/ctmua.module';
import { EmployeeModule } from '../employee/employee.module';
import { CtbanModule } from '../ctban/ctban.module';
import { PhieuChiModule } from '../phieu-chi/phieu-chi.module';

@Module({
  controllers: [ReportCostController],
  providers: [ReportCostService, ReportCostRepository],
  exports: [ReportCostService],
  imports: [CtmuaModule, EmployeeModule, CtbanModule, PhieuChiModule],
})
export class ReportCostModule {}
