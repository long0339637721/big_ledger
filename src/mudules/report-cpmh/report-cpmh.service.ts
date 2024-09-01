import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportCpmhDto } from './dto/create-report-cpmh.dto';
import { UpdateReportCpmhDto } from './dto/update-report-cpmh.dto';
import { ReportCpmhRepository } from './report-cpmh.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { EmployeeService } from '../employee/employee.service';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { Supplier } from '../supplier/entities';
import { Ctmua } from '../ctmua/entities/ctmua.entity';

@Injectable()
export class ReportCpmhService {
  constructor(
    private readonly reportCpmhRepository: ReportCpmhRepository,
    private readonly ctmuaService: CtmuaService,
    private readonly employeeService: EmployeeService,
    private readonly productService: ProductService,
  ) {}

  async create(
    createReportCpmhDto: CreateReportCpmhDto,
    idRaw: boolean = false,
  ) {
    const startDate = new Date(createReportCpmhDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportCpmhDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const ctmuas = await this.ctmuaService.findByDate(startDate, endDate);
    const products = await this.productService.findAll();

    const reportCpmhDetail = new Map<
      number,
      {
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
      }
    >();
    products.forEach((product) => {
      reportCpmhDetail.set(product.id, {
        product,
        count: 0,
        productValue: 0,
        discountValue: 0,
        totalValue: 0,
        reportCpmhProductDetails: [],
      });
      const reportCpmhProductDetail = new Map<
        number,
        {
          supplier: Supplier;
          count: number;
          productValue: number;
          discountValue: number;
          totalValue: number;
          ctmuas: Ctmua[];
        }
      >();
      ctmuas.forEach((ctmua) => {
        const productOfCtmua = ctmua.productOfCtmua.find(
          (each) => each.product.id === product.id,
        );
        if (productOfCtmua) {
          const productTotal = reportCpmhDetail.get(product.id);
          if (!productTotal) {
            throw new NotFoundException(`Product ${product.id} not found`);
          }
          productTotal.count += productOfCtmua.count;
          productTotal.productValue +=
            productOfCtmua.count * productOfCtmua.price;
          productTotal.discountValue +=
            productOfCtmua.count * ctmua.donMuaHang.discountRate;
          productTotal.totalValue +=
            productOfCtmua.count * productOfCtmua.price -
            productOfCtmua.count * ctmua.donMuaHang.discountRate;
          if (!reportCpmhProductDetail.has(ctmua.donMuaHang.supplier.id)) {
            reportCpmhProductDetail.set(ctmua.donMuaHang.supplier.id, {
              supplier: ctmua.donMuaHang.supplier,
              count: 0,
              productValue: 0,
              discountValue: 0,
              totalValue: 0,
              ctmuas: [],
            });
          }
          const supplierTotal = reportCpmhProductDetail.get(
            ctmua.donMuaHang.supplier.id,
          );
          if (!supplierTotal) {
            throw new NotFoundException(
              `Supplier ${ctmua.donMuaHang.supplier.id} not found`,
            );
          }
          supplierTotal.count += productOfCtmua.count;
          supplierTotal.productValue +=
            productOfCtmua.count * productOfCtmua.price;
          supplierTotal.discountValue +=
            productOfCtmua.count * ctmua.donMuaHang.discountRate;
          supplierTotal.totalValue +=
            productOfCtmua.count * productOfCtmua.price -
            productOfCtmua.count * ctmua.donMuaHang.discountRate;
          supplierTotal.ctmuas.push(ctmua);
          productTotal.reportCpmhProductDetails = Array.from(
            reportCpmhProductDetail.values(),
          );
        }
      });
    });
    reportCpmhDetail.forEach((value, key) => {
      if (value.count === 0) {
        reportCpmhDetail.delete(key);
      }
    });
    const totalCost = Array.from(reportCpmhDetail.values()).reduce(
      (sum, each) => sum + each.totalValue,
      0,
    );
    if (!idRaw) {
      return this.reportCpmhRepository.create(
        createReportCpmhDto,
        Array.from(reportCpmhDetail.values()),
        totalCost,
      );
    }
    return {
      createReportCpmhDto,
      totalCost,
      reportCpmhDetail: Array.from(reportCpmhDetail.values()),
    };
  }

  findAll() {
    return this.reportCpmhRepository.findAll();
  }

  async findOne(id: number) {
    const reportCpmh = await this.reportCpmhRepository.findOne(id);
    if (!reportCpmh) {
      throw new NotFoundException(`Report cpmh #${id} not found`);
    }
    return reportCpmh;
  }

  update(id: number, updateReportCpmhDto: UpdateReportCpmhDto) {
    return `This action updates a #${id} reportCpmh`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportCpmh`;
  }
}
