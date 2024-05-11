import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ORDER, OrderType, PaymentStatusType } from 'src/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCtbanDto } from './dto/create-ctban.dto';
import { UpdateCtbanDto } from './dto/update-ctban.dto';
import { GetCtbanDto } from './dto/get-ctban.dto';
import { CtbanRepository } from './ctban.repository';
import { EmployeeService } from '../employee/employee.service';
import { DonBanHangService } from '../don-ban-hang/don-ban-hang.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class CtbanService {
  constructor(
    private readonly ctbanRepository: CtbanRepository,
    private readonly employeeService: EmployeeService,
    private readonly donBanHangService: DonBanHangService,
    private readonly productService: ProductService,
  ) {}

  async create(createCtbanDto: CreateCtbanDto) {
    const warehouseKeeper = await this.employeeService.findOneWarehouseKeeper(
      createCtbanDto.warehouseKeeperId,
    );
    const donBanHang = await this.donBanHangService.findOne(
      createCtbanDto.donBanHangId,
    );
    const productOfCtban = await Promise.all(
      createCtbanDto.products.map(async (each) => {
        const product = await this.productService.findOne(each.productId);
        return {
          product: product,
          count: each.count,
          price: product.priceDelivery,
        };
      }),
    );
    let totalProductValue = 0;
    let totalTaxValue = 0;
    let totalDiscountValue = 0;
    for (const product of productOfCtban) {
      const productValue = product.count * product.price;
      const discountValue = (productValue * donBanHang.cktm.discountRate) / 100;
      const taxValue =
        ((productValue - discountValue) * product.product.productGroup.tax) /
        100;
      totalProductValue += productValue;
      totalDiscountValue += discountValue;
      totalTaxValue += taxValue;
    }
    const finalValue = totalProductValue - totalDiscountValue + totalTaxValue;

    return this.ctbanRepository.create(
      createCtbanDto,
      warehouseKeeper,
      donBanHang,
      totalProductValue,
      totalDiscountValue,
      totalTaxValue,
      finalValue,
      productOfCtban,
    );
  }

  async findAll(query: GetCtbanDto) {
    let sortOptions: [string, OrderType][] = [];
    if (query.sorts) {
      sortOptions = query.sorts;
    } else {
      sortOptions = [['id', ORDER.DESC]];
    }
    sortOptions.forEach((sortOption) => {
      if (!['id', 'deliveryDate', 'paymentMethod'].includes(sortOption[0])) {
        throw new UnprocessableEntityException(
          'Key of sort options is not valid',
        );
      }
    });
    const donBanHangs = await this.ctbanRepository.findAllNoPage(
      // query.pageSize,
      // query.pageSize * (query.currentPage - 1),
      sortOptions,
    );
    // const pagination = new PaginationDto(
    //   query.currentPage,
    //   query.pageSize,
    //   Math.ceil(donBanHangs[1] / query.pageSize),
    //   donBanHangs[1],
    // );
    const pagination = new PaginationDto(1, 9999, 1, donBanHangs[1]);
    return { data: donBanHangs[0], pagination: pagination };
  }

  findByPaymentStatus(status: PaymentStatusType[]) {
    return this.ctbanRepository.findByPaymentStatus(status);
  }

  async findOne(id: number) {
    const ctban = await this.ctbanRepository.findOne(id);
    if (!ctban) {
      throw new NotFoundException('Ctban not found');
    }
    return ctban;
  }

  async findTotalMoney(id: number) {
    const ctban = await this.findOne(id);
    let total = 0;
    ctban.productOfCtban.forEach((product) => {
      total += product.price * product.count;
    });
    return total;
  }

  update(id: number, updateCtbanDto: UpdateCtbanDto) {
    return `This action updates a #${id} ctban`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctban`;
  }
}
