import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  ReportCpmh,
  ReportCpmhDetail,
  ReportCpmhProductDetail,
} from './entities/report-cpmh.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ReportCpmhRepository {
  private readonly reportCpmhRepository: Repository<ReportCpmh>;
  private readonly reportCpmhDetailRepository: Repository<ReportCpmhDetail>;
  private readonly reportCpmhProductDetailRepository: Repository<ReportCpmhProductDetail>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.reportCpmhRepository = this.dataSource.getRepository(ReportCpmh);
    this.reportCpmhDetailRepository =
      this.dataSource.getRepository(ReportCpmhDetail);
    this.reportCpmhProductDetailRepository = this.dataSource.getRepository(
      ReportCpmhProductDetail,
    );
  }

  create() {
    //
  }

  findAll() {
    return this.reportCpmhRepository.find({
      relations: {
        reportCpmhDetails: {
          product: true,
          reportCpmhProductDetails: {
            supplier: true,
            ctmuas: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.reportCpmhRepository.findOne({
      where: { id: id },
      relations: {
        reportCpmhDetails: {
          product: true,
          reportCpmhProductDetails: {
            supplier: true,
            ctmuas: true,
          },
        },
      },
    });
  }
}
