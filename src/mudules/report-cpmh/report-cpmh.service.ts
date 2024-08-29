import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportCpmhDto } from './dto/create-report-cpmh.dto';
import { UpdateReportCpmhDto } from './dto/update-report-cpmh.dto';
import { ReportCpmhRepository } from './report-cpmh.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ReportCpmhService {
  constructor(
    private readonly reportCpmhRepository: ReportCpmhRepository,
    private readonly ctmuaService: CtmuaService,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createReportCpmhDto: CreateReportCpmhDto) {
    const startDate = new Date(createReportCpmhDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportCpmhDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const ctmuas = await this.ctmuaService.findByDate(startDate, endDate);

    // const
  }

  findAll() {
    return this.reportCpmhRepository.findAll();
  }

  async findOne(id: number) {
    const reportCpmh = await this.reportCpmhRepository.findOne(id);
    if (!reportCpmh) {
      throw new NotFoundException(`Report cpmh #${id} not found`);
    }
    return reportCpmh;
  }

  update(id: number, updateReportCpmhDto: UpdateReportCpmhDto) {
    return `This action updates a #${id} reportCpmh`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportCpmh`;
  }
}
