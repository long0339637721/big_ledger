import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportThcnDto } from './dto/create-report-thcn.dto';
import { UpdateReportThcnDto } from './dto/update-report-thcn.dto';
import { ReportThcnRepository } from './report-thcn.repository';
import { CtbanService } from '../ctban/ctban.service';
import { PAYMENT_STATUS } from 'src/constants';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ReportThcnService {
  constructor(
    private readonly reportThcnRepository: ReportThcnRepository,
    private readonly ctbanService: CtbanService,
    private readonly customerService: CustomerService,
  ) {}

  async create(
    createReportThcnDto: CreateReportThcnDto,
    isRaw: boolean = false,
  ) {
    const startDate = new Date(createReportThcnDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportThcnDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const customers = await this.customerService.findByIds(
      createReportThcnDto.customerIds,
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
        ...createReportThcnDto,
        reportThcnDetails: ctbans,
      };
    }
    return this.reportThcnRepository.create(createReportThcnDto, ctbans);
  }

  findAll() {
    return this.reportThcnRepository.findAll();
  }

  async findOne(id: number) {
    const report = await this.reportThcnRepository.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  update(id: number, updateReportThcnDto: UpdateReportThcnDto) {
    return `This action updates a #${id} reportThcn`;
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    return this.reportThcnRepository.remove(report);
  }
}
