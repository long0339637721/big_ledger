import { Injectable } from '@nestjs/common';
import { CreateReportCostDto } from './dto/create-report-cost.dto';
import { UpdateReportCostDto } from './dto/update-report-cost.dto';
import { ReportCostRepository } from './report-cost.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ReportCostService {
  constructor(
    private readonly reportCostRepository: ReportCostRepository,
    private readonly ctmuaService: CtmuaService,
    private readonly employeeService: EmployeeService,
  ) {}

  create(createReportCostDto: CreateReportCostDto) {
    return 'This action adds a new reportCost';
  }

  findAll() {
    return `This action returns all reportCost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportCost`;
  }

  update(id: number, updateReportCostDto: UpdateReportCostDto) {
    return `This action updates a #${id} reportCost`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportCost`;
  }
}
