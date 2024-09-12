import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createReportCostDto: CreateReportCostDto) {
    const startDate = new Date(createReportCostDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportCostDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const ctmuas = await this.ctmuaService.findByDate(startDate, endDate);

    // const
    return this.reportCostRepository.create(createReportCostDto, ctmuas);
  }

  findAll() {
    return this.reportCostRepository.findAll();
  }

  async findOne(id: number) {
    const reportCost = await this.reportCostRepository.findOne(id);
    if (!reportCost) {
      throw new NotFoundException(`Report cost #${id} not found`);
    }
    return reportCost;
  }
}
