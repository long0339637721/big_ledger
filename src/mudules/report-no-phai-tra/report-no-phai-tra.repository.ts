import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ReportNoPhaiTra } from './entities/report-no-phai-tra.entity';
import { CreateReportNoPhaiTraDto } from './dto/create-report-no-phai-tra.dto';

@Injectable()
export class ReportNoPhaiTraRepository {
  private readonly reportNoPhaiTraRepository: Repository<ReportNoPhaiTra>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.reportNoPhaiTraRepository =
      this.dataSource.getRepository(ReportNoPhaiTra);
  }

  create(createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    const reportNoPhaiTra = this.reportNoPhaiTraRepository.create(
      createReportNoPhaiTraDto,
    );
    return this.dataSource.manager.save(reportNoPhaiTra);
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
