import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportNoPhaiTraDto } from './dto/create-report-no-phai-tra.dto';
import { UpdateReportNoPhaiTraDto } from './dto/update-report-no-phai-tra.dto';
import { ReportNoPhaiTraRepository } from './report-no-phai-tra.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { SupplierService } from '../supplier/supplier.service';
import { Supplier } from '../supplier/entities';
import { Ctmua } from '../ctmua/entities/ctmua.entity';

@Injectable()
export class ReportNoPhaiTraService {
  constructor(
    private readonly reportNoPhaiTraRepository: ReportNoPhaiTraRepository,
    private readonly ctmuaService: CtmuaService,
    private readonly supplierService: SupplierService,
  ) {}

  async create(
    createReportNoPhaiTraDto: CreateReportNoPhaiTraDto,
    isRaw: boolean = false,
  ) {
    const toDay = new Date();
    toDay.setHours(0, 0, 0, 0);
    const startDate = new Date(createReportNoPhaiTraDto.startDate);
    const endDate = new Date(createReportNoPhaiTraDto.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    const ctmua = await this.ctmuaService.findByDate(startDate, endDate);

    const ctmuaGroupBySupplier = new Map<
      number,
      {
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
      }
    >();

    ctmua.forEach((ctmua) => {
      const supplierId = ctmua.donMuaHang.supplier.id;
      const supplier = ctmuaGroupBySupplier.get(supplierId);
      if (!supplier) {
        const paymentTerm = new Date(ctmua.paymentTerm);
        if (paymentTerm >= toDay) {
          ctmuaGroupBySupplier.set(supplierId, {
            supplier: ctmua.donMuaHang.supplier,
            total: ctmua.finalValue,
            paid: ctmua.paidValue,
            inOfDate: ctmua.finalValue - ctmua.paidValue,
            outOfDate: 0,
            reportNoPhaiTraSupplierDetails: [
              {
                ctmua,
                total: ctmua.finalValue,
                paid: ctmua.paidValue,
                inOfDate: ctmua.finalValue - ctmua.paidValue,
                outOfDate: 0,
              },
            ],
          });
        } else {
          ctmuaGroupBySupplier.set(supplierId, {
            supplier: ctmua.donMuaHang.supplier,
            total: ctmua.finalValue,
            paid: ctmua.paidValue,
            inOfDate: 0,
            outOfDate: ctmua.finalValue - ctmua.paidValue,
            reportNoPhaiTraSupplierDetails: [
              {
                ctmua,
                total: ctmua.finalValue,
                paid: ctmua.paidValue,
                inOfDate: 0,
                outOfDate: ctmua.finalValue - ctmua.paidValue,
              },
            ],
          });
        }
      } else {
        const paymentTerm = new Date(ctmua.paymentTerm);
        if (paymentTerm >= toDay) {
          supplier.total += ctmua.finalValue;
          supplier.paid += ctmua.paidValue;
          supplier.inOfDate += ctmua.finalValue - ctmua.paidValue;
          supplier.reportNoPhaiTraSupplierDetails.push({
            ctmua,
            total: ctmua.finalValue,
            paid: ctmua.paidValue,
            inOfDate: ctmua.finalValue - ctmua.paidValue,
            outOfDate: 0,
          });
        } else {
          supplier.total += ctmua.finalValue;
          supplier.paid += ctmua.paidValue;
          supplier.outOfDate += ctmua.finalValue - ctmua.paidValue;
          supplier.reportNoPhaiTraSupplierDetails.push({
            ctmua,
            total: ctmua.finalValue,
            paid: ctmua.paidValue,
            inOfDate: 0,
            outOfDate: ctmua.finalValue - ctmua.paidValue,
          });
        }
      }
    });

    if (isRaw) {
      return {
        ...createReportNoPhaiTraDto,
        reportNoPhaiTraDetails: Array.from(ctmuaGroupBySupplier.values()),
      };
    }

    return this.reportNoPhaiTraRepository.create(
      createReportNoPhaiTraDto,
      Array.from(ctmuaGroupBySupplier.values()),
    );
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
