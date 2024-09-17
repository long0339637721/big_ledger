import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReportCost } from './entities/report-cost.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateReportCostDto } from './dto/create-report-cost.dto';
import { Ctmua } from '../ctmua/entities/ctmua.entity';

@Injectable()
export class ReportCostRepository {
  private readonly reportCostRepository: Repository<ReportCost>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.reportCostRepository = this.dataSource.getRepository(ReportCost);
  }

  create(
    createReportCostDto: CreateReportCostDto,
    detail: {
      revenue: number;
      revenueDeduction: number;
      netRevenue: number;
      goodsCost: number;
      grossProfit: number;
      financeIncome: number;
      financeExpense: number;
      sellingExpense: number;
      managementExpense: number;
      operatingProfit: number;
      otherIncome: number;
      otherExpense: number;
      otherProfit: number;
      profitBeforeTax: number;
      corporateIncomeTax: number;
      profitAfterTax: number;
    },
  ) {
    return this.reportCostRepository.save({
      ...createReportCostDto,
      ...detail,
    });
  }

  findAll() {
    return this.reportCostRepository.find();
  }

  findOne(id: number) {
    return this.reportCostRepository.findOne({
      where: { id: id },
    });
  }
}
