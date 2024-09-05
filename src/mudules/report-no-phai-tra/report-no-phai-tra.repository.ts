import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import {
  ReportNoPhaiTra,
  ReportNoPhaiTraDetail,
  ReportNoPhaiTraSupplierDetail,
} from './entities/report-no-phai-tra.entity';
import { CreateReportNoPhaiTraDto } from './dto/create-report-no-phai-tra.dto';
import { Supplier } from '../supplier/entities';
import { Ctmua } from '../ctmua/entities/ctmua.entity';

@Injectable()
export class ReportNoPhaiTraRepository {
  private readonly reportNoPhaiTraRepository: Repository<ReportNoPhaiTra>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.reportNoPhaiTraRepository =
      this.dataSource.getRepository(ReportNoPhaiTra);
  }

  create(
    createReportNoPhaiTraDto: CreateReportNoPhaiTraDto,
    reportNoPhaiTraDetails: {
      supplier: Supplier;
      total: number;
      paid: number;
      inOfDate: number;
      outOfDate: number;
      reportNoPhaiTraSupplierDetails: {
        ctmua: Ctmua;
        total: number;
        paid: number;
        inOfDate: number;
        outOfDate: number;
      }[];
    }[],
  ) {
    const newReportNoPhaiTra = this.reportNoPhaiTraRepository.create(
      createReportNoPhaiTraDto,
    );
    return this.dataSource.transaction(async (manager) => {
      const savedReportNoPhaiTra = await manager.save(newReportNoPhaiTra);
      await Promise.all(
        reportNoPhaiTraDetails.map(async (each) => {
          const newReportNoPhaiTraDetail =
            manager.create<ReportNoPhaiTraDetail>(ReportNoPhaiTraDetail, {
              ...each,
              reportNoPhaiTra: savedReportNoPhaiTra,
            });
          const savedReportNoPhaiTraDetail = await manager.save(
            newReportNoPhaiTraDetail,
          );
          await Promise.all(
            each.reportNoPhaiTraSupplierDetails.map(async (ctmua) => {
              const newReportNoPhaiTraSupplierDetail =
                manager.create<ReportNoPhaiTraSupplierDetail>(
                  ReportNoPhaiTraSupplierDetail,
                  {
                    ...ctmua,
                    reportNoPhaiTraDetail: savedReportNoPhaiTraDetail,
                  },
                );
              await manager.save(newReportNoPhaiTraSupplierDetail);
            }),
          );
        }),
      );
    });
  }

  findAll() {
    return this.reportNoPhaiTraRepository.find({
      relations: {
        reportNoPhaiTraDetails: {
          supplier: true,
          reportNoPhaiTraSupplierDetails: {
            ctmua: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.reportNoPhaiTraRepository.findOne({
      where: { id: id },
      relations: {
        reportNoPhaiTraDetails: {
          supplier: true,
          reportNoPhaiTraSupplierDetails: {
            ctmua: true,
          },
        },
      },
    });
  }

  update(id: number, updateReportNoPhaiTraDto: any) {
    return this.reportNoPhaiTraRepository.update(id, updateReportNoPhaiTraDto);
  }

  remove(id: number) {
    return this.reportNoPhaiTraRepository.delete(id);
  }
}
