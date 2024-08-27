import { Module } from '@nestjs/common';
import { ReportCostService } from './report-cost.service';
import { ReportCostController } from './report-cost.controller';
import { ReportCostRepository } from './report-cost.repository';
import { CtmuaModule } from '../ctmua/ctmua.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  controllers: [ReportCostController],
  providers: [ReportCostService, ReportCostRepository],
  exports: [ReportCostService],
  imports: [CtmuaModule, EmployeeModule],
})
export class ReportCostModule {}
