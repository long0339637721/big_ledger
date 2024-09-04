import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportNoPhaiTraDto } from './dto/create-report-no-phai-tra.dto';
import { UpdateReportNoPhaiTraDto } from './dto/update-report-no-phai-tra.dto';
import { ReportNoPhaiTraRepository } from './report-no-phai-tra.repository';
import { Ctmua } from '../ctmua/entities/ctmua.entity';
import { Supplier } from '../supplier/entities';

@Injectable()
export class ReportNoPhaiTraService {
  constructor(
    private readonly reportNoPhaiTraRepository: ReportNoPhaiTraRepository,
    private readonly supplierRepository: Supplier,
    private readonly ctmuaRepository: Ctmua,
  ) {}

  create(createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    return 'This action adds a new reportNoPhaiTra';
  }

  findAll() {
    return this.reportNoPhaiTraRepository.findAll();
  }

  async findOne(id: number) {
    const reportNoPhaiTra = await this.reportNoPhaiTraRepository.findOne(id);
    if (!reportNoPhaiTra) {
      throw new NotFoundException(`ReportNoPhaiTra #${id} not found`);
    }
    return reportNoPhaiTra;
  }

  update(id: number, updateReportNoPhaiTraDto: UpdateReportNoPhaiTraDto) {
    return `This action updates a #${id} reportNoPhaiTra`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportNoPhaiTra`;
  }
}
