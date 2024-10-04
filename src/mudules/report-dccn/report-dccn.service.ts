import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDccnDto } from './dto/create-report-dccn.dto';
import { UpdateReportDccnDto } from './dto/update-report-dccn.dto';
import { ReportDccnRepository } from './report-dccn.repository';
import { CtbanService } from '../ctban/ctban.service';
import { PAYMENT_STATUS } from 'src/constants';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ReportDccnService {
  constructor(
    private readonly reportDccnRepository: ReportDccnRepository,
    private readonly ctbanService: CtbanService,
    private readonly customerService: CustomerService,
  ) {}

  async create(
    createReportDccnDto: CreateReportDccnDto,
    isRaw: boolean = false,
  ) {
    const startDate = new Date(createReportDccnDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportDccnDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const customers = await this.customerService.findByIds(
      createReportDccnDto.customerIds,
    );
    const ctbans =
      await this.ctbanService.findByPaymentStatusAndGroupByCustomer(
        [PAYMENT_STATUS.NOT_PAID, PAYMENT_STATUS.BEING_PAID],
        startDate,
        endDate,
        customers,
      );
    if (isRaw) {
      return {
        ...createReportDccnDto,
        reportDccnDetails: ctbans,
      };
    }
    return this.reportDccnRepository.create(createReportDccnDto, ctbans);
  }

  findAll() {
    return this.reportDccnRepository.findAll();
  }

  async findOne(id: number) {
    const reportDccn = await this.reportDccnRepository.findOne(id);
    if (!reportDccn) {
      throw new NotFoundException('ReportDccn not found');
    }
    return reportDccn;
  }

  update(id: number, updateReportDccnDto: UpdateReportDccnDto) {
    return `This action updates a #${id} reportDccn`;
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    return this.reportDccnRepository.remove(report);
  }
}
