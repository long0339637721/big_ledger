import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReportCost } from './entities/report-cost.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ReportCostRepository {
  private readonly reportCostRepository: Repository<ReportCost>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.reportCostRepository = this.dataSource.getRepository(ReportCost);
  }
}
