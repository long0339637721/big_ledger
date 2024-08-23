import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateCtmuaDto } from './dto/create-ctmua.dto';
import { UpdateCtmuaDto } from './dto/update-ctmua.dto';
import { GetCtmuaDto } from './dto/get-ctmua.dto';
import { CtmuaRepository } from './ctmua.repository';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { EmployeeService } from '../employee/employee.service';
import { DonMuaHangService } from '../don-mua-hang/don-mua-hang.service';
import { ProductService } from '../product/product.service';
import { PAYMENT_STATUS } from 'src/constants';

@Injectable()
export class CtmuaService {
  constructor(
    private readonly ctmuaRepository: CtmuaRepository,
    private readonly employeeService: EmployeeService,
    private readonly donMuaHangService: DonMuaHangService,
    private readonly productService: ProductService,
  ) {}

  async create(createCtmuaDto: CreateCtmuaDto) {
    const warehouseKeeper = await this.employeeService.findOneWarehouseKeeper(
      createCtmuaDto.warehouseKeeperId,
    );
    const donMuaHang = await this.donMuaHangService.findOne(
      createCtmuaDto.donMuaHangId,
    );
    const productOfDonMuaHangs = donMuaHang.productOfDonMuaHangs;
    const productOfCtmuas = await Promise.all(
      createCtmuaDto.products.map(async (each) => {
        const product = await this.productService.findOne(each.productId);
        const productOfDonMuaHang = productOfDonMuaHangs.find(
          (productOfDonMuaHang) =>
            productOfDonMuaHang.product.id === product.id,
        );
        if (!productOfDonMuaHang) {
          throw new ConflictException(
            `Product ${product.id} not found in DonMuaHang`,
          );
        }
        if (
          productOfDonMuaHang.count - productOfDonMuaHang.delivered <
          each.count
        ) {
          throw new UnprocessableEntityException(
            `Product ${product.id} has only ${
              productOfDonMuaHang.count - productOfDonMuaHang.delivered
            } left`,
          );
        }
        return {
          product: product,
          count: each.count,
          price: productOfDonMuaHang.price,
        };
      }),
    );

    productOfCtmuas.forEach(async (each) => {
      await this.donMuaHangService.deliverDonMuaHang(
        donMuaHang.id,
        each.product,
        each.count,
      );
      await this.productService.deliverProduct(
        each.product.id,
        each.count,
        true,
      );
    });

    await this.donMuaHangService.checkAndUpdateDocumentStatus(donMuaHang.id);

    const totalProductValue = productOfCtmuas.reduce(
      (sum, each) => sum + each.count * each.price,
      0,
    );
    const totalDiscountValue =
      (donMuaHang.discountRate * totalProductValue) / 100 + donMuaHang.discount;
    const finalValue =
      totalProductValue - totalDiscountValue >= 0
        ? totalProductValue - totalDiscountValue
        : 0;

    return this.ctmuaRepository.create(
      createCtmuaDto,
      warehouseKeeper,
      donMuaHang,
      totalProductValue,
      totalDiscountValue,
      finalValue,
      productOfCtmuas,
    );
  }

  async findAll() {
    return this.ctmuaRepository.findAll();
  }

  async findOne(id: number) {
    const ctmua = await this.ctmuaRepository.findOne(id);
    if (!ctmua) {
      throw new NotFoundException(`Ctmua with id ${id} not found`);
    }
    return ctmua;
  }

  async checkAndUpdatePaymentStatus(id: number) {
    const ctmua = await this.findOne(id);
    if (ctmua.finalValue === ctmua.paidValue) {
      return this.ctmuaRepository.updatePaymentStatus(id, PAYMENT_STATUS.PAID);
    }
    if (ctmua.paidValue > 0) {
      return this.ctmuaRepository.updatePaymentStatus(
        id,
        PAYMENT_STATUS.BEING_PAID,
      );
    }
    return this.ctmuaRepository.updatePaymentStatus(
      id,
      PAYMENT_STATUS.NOT_PAID,
    );
  }

  async reportCostOfYear(year: number) {
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
    const ctmuas = await this.ctmuaRepository.findByDate(startDate, endDate);
    const ctbansGroupByMonth = new Map();
    for (let i = 1; i < 13; i++) {
      ctbansGroupByMonth.set(i, {
        month: i,
        totalProductValue: 0,
        totalDiscountValue: 0,
        finalValue: 0,
        paidValue: 0,
        ctmuas: [],
      });
    }
    ctmuas.forEach((ctmua) => {
      const createdAt = new Date(ctmua.createdAt);
      const month = createdAt.getMonth() + 1;
      if (!ctbansGroupByMonth.has(month)) {
        ctbansGroupByMonth.set(month, {
          month: month,
          totalProductValue: 0,
          totalDiscountValue: 0,
          finalValue: 0,
          paidValue: 0,
          ctmuas: [],
        });
      }
      ctbansGroupByMonth.get(month).totalProductValue +=
        ctmua.totalProductValue;
      ctbansGroupByMonth.get(month).totalDiscountValue +=
        ctmua.totalDiscountValue;
      ctbansGroupByMonth.get(month).finalValue += ctmua.finalValue;
      ctbansGroupByMonth.get(month).paidValue += ctmua.paidValue;
      ctbansGroupByMonth.get(month).ctmuas.push(ctmua);
    });
    return Array.from(ctbansGroupByMonth.values());
  }

  async reportCostOfQuarter(year: number, quarter: number) {
    const startDate = new Date(year, (quarter - 1) * 3, 1, 0, 0, 0, 0);
    const endDate = new Date(year, quarter * 3, 0, 23, 59, 59, 999);
    const ctmuas = await this.ctmuaRepository.findByDate(startDate, endDate);
    const ctbansGroupByMonth = new Map();
    for (let i = (quarter - 1) * 3 + 1; i < quarter * 3 + 1; i++) {
      ctbansGroupByMonth.set(i, {
        month: i,
        totalProductValue: 0,
        totalDiscountValue: 0,
        finalValue: 0,
        paidValue: 0,
        ctmuas: [],
      });
    }
    ctmuas.forEach((ctmua) => {
      const createdAt = new Date(ctmua.createdAt);
      const month = createdAt.getMonth() + 1;
      if (!ctbansGroupByMonth.has(month)) {
        ctbansGroupByMonth.set(month, {
          month: month,
          totalProductValue: 0,
          totalDiscountValue: 0,
          finalValue: 0,
          paidValue: 0,
          ctmuas: [],
        });
      }
      ctbansGroupByMonth.get(month).totalProductValue +=
        ctmua.totalProductValue;
      ctbansGroupByMonth.get(month).totalDiscountValue +=
        ctmua.totalDiscountValue;
      ctbansGroupByMonth.get(month).finalValue += ctmua.finalValue;
      ctbansGroupByMonth.get(month).paidValue += ctmua.paidValue;
      ctbansGroupByMonth.get(month).ctmuas.push(ctmua);
    });
    return Array.from(ctbansGroupByMonth.values());
  }

  async reportCostOfMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    const ctmuas = await this.ctmuaRepository.findByDate(startDate, endDate);
    const ctbansGroupByDay = new Map();
    for (let i = 1; i < new Date(year, month, 0).getDate() + 1; i++) {
      ctbansGroupByDay.set(i, {
        day: i,
        totalProductValue: 0,
        totalDiscountValue: 0,
        finalValue: 0,
        paidValue: 0,
        ctmuas: [],
      });
    }
    ctmuas.forEach((ctmua) => {
      const createdAt = new Date(ctmua.createdAt);
      const day = createdAt.getDate();
      if (!ctbansGroupByDay.has(day)) {
        ctbansGroupByDay.set(day, {
          day: day,
          totalProductValue: 0,
          totalDiscountValue: 0,
          finalValue: 0,
          paidValue: 0,
          ctmuas: [],
        });
      }
      ctbansGroupByDay.get(day).totalProductValue += ctmua.totalProductValue;
      ctbansGroupByDay.get(day).totalDiscountValue += ctmua.totalDiscountValue;
      ctbansGroupByDay.get(day).finalValue += ctmua.finalValue;
      ctbansGroupByDay.get(day).paidValue += ctmua.paidValue;
      ctbansGroupByDay.get(day).ctmuas.push(ctmua);
    });
    return Array.from(ctbansGroupByDay.values());
  }

  update(id: number, updateCtmuaDto: UpdateCtmuaDto) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
