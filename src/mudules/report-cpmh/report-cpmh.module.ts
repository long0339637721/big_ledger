import { Module } from '@nestjs/common';
import { ReportCpmhService } from './report-cpmh.service';
import { ReportCpmhController } from './report-cpmh.controller';
import { ReportCpmhRepository } from './report-cpmh.repository';
import { CtmuaModule } from '../ctmua/ctmua.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  controllers: [ReportCpmhController],
  providers: [ReportCpmhService, ReportCpmhRepository],
  imports: [CtmuaModule, EmployeeModule],
  exports: [ReportCpmhService],
})
export class ReportCpmhModule {}
