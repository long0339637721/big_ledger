import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  ReportCpmh,
  ReportCpmhDetail,
  ReportCpmhProductDetail,
} from './entities/report-cpmh.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateReportCpmhDto } from './dto/create-report-cpmh.dto';
import { Product } from '../product/entities/product.entity';
import { Supplier } from '../supplier/entities';
import { Ctmua } from '../ctmua/entities/ctmua.entity';

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

  create(
    reportCpmh: CreateReportCpmhDto,
    reportCpmhDetail: {
      product: Product;
      count: number;
      productValue: number;
      discountValue: number;
      totalValue: number;
      reportCpmhProductDetails: {
        supplier: Supplier;
        count: number;
        productValue: number;
        discountValue: number;
        totalValue: number;
        ctmuas: Ctmua[];
      }[];
    }[],
    totalCost: number,
  ) {
    const newReportCpmh = this.reportCpmhRepository.create({
      ...reportCpmh,
      totalCost,
    });
    return this.dataSource.transaction(async (manager) => {
      const savedReportCpmh = await manager.save(newReportCpmh);
      await Promise.all(
        reportCpmhDetail.map(async (each) => {
          const newReportCpmhDetail = manager.create(ReportCpmhDetail, {
            ...each,
            reportCpmh: savedReportCpmh,
          });
          const savedReportCpmhDetail = await manager.save(newReportCpmhDetail);
          await Promise.all(
            each.reportCpmhProductDetails.map(async (each) => {
              const newReportCpmhProductDetail = manager.create(
                ReportCpmhProductDetail,
                {
                  ...each,
                  reportCpmhDetail: savedReportCpmhDetail,
                },
              );
              return manager.save(newReportCpmhProductDetail);
            }),
          );
        }),
      );
      return savedReportCpmh;
    });
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
