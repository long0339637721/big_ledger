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

  update(id: number, updateCtmuaDto: UpdateCtmuaDto) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
