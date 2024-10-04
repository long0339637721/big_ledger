import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ORDER,
  OrderType,
  PAYMENT_STATUS,
  PaymentStatusType,
} from 'src/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCtbanDto } from './dto/create-ctban.dto';
import { UpdateCtbanDto } from './dto/update-ctban.dto';
import { GetCtbanDto } from './dto/get-ctban.dto';
import { CtbanRepository } from './ctban.repository';
import { EmployeeService } from '../employee/employee.service';
import { DonBanHangService } from '../don-ban-hang/don-ban-hang.service';
import { ProductService } from '../product/product.service';
import { Customer } from '../customer/entities/customer.entity';
import { Ctban } from './entities/ctban.entity';
import { Salesperson } from '../employee/entities/employee.entity';

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
    const productOfCtbans = await Promise.all(
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
    for (const product of productOfCtbans) {
      const productValue = product.count * product.price;
      const discountValue = (productValue * donBanHang.discountRate) / 100;
      const taxValue =
        ((productValue - discountValue) * product.product.productGroup.tax) /
        100;
      totalProductValue += productValue;
      totalDiscountValue += discountValue;
      totalTaxValue += taxValue;
    }
    const finalValue = totalProductValue - totalDiscountValue + totalTaxValue;

    for (const product of productOfCtbans) {
      if (product.count > product.product.ordered) {
        throw new ConflictException(
          `Product ${product.product.id} out of stock`,
        );
      }
    }

    for (const product of productOfCtbans) {
      await this.donBanHangService.deliverDonBanHang(
        donBanHang,
        product.product,
        product.count,
      );
    }

    for (const product of productOfCtbans) {
      await this.productService.deliverProduct(
        product.product.id,
        product.count,
      );
    }

    await this.donBanHangService.checkAndUpdateDeliveryStatus(donBanHang.id);

    return this.ctbanRepository.create(
      createCtbanDto,
      warehouseKeeper,
      donBanHang,
      totalProductValue,
      totalDiscountValue,
      totalTaxValue,
      finalValue,
      productOfCtbans,
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

  async findByPaymentStatusAndGroupByCustomer(
    status: PaymentStatusType[],
    startDate: Date = new Date(0),
    endDate: Date = new Date(),
    customers: Customer[],
  ): Promise<
    {
      customer: Customer;
      ctbans: {
        ctban: Ctban;
        collected: number;
        notCollected: number;
        inOfDate: number;
        outOfDate: number;
      }[];
      collectedTotal: number;
      notCollectedTotal: number;
      inOfDate: number;
      outOfDate: number;
    }[]
  > {
    const now = new Date();
    now.setHours(8, 0, 0, 0);
    const customerIds = customers.map((customer) => customer.id);
    const ctbans = await this.ctbanRepository.findByPaymentStatusAndDate(
      status,
      startDate,
      endDate,
      customerIds,
    );
    const ctbansGroupByCustomer = new Map();
    for (const ctban of ctbans) {
      if (!ctbansGroupByCustomer.has(ctban.donBanHang.customer.id)) {
        ctbansGroupByCustomer.set(ctban.donBanHang.customer.id, {
          customer: ctban.donBanHang.customer,
          ctbans: [],
          collectedTotal: 0,
          notCollectedTotal: 0,
          inOfDate: 0,
          outOfDate: 0,
        });
      }
      // ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).ctbans.push({
      //   ctban: ctban,
      //   collected: ctban.paidValue,
      //   notCollected: ctban.finalValue - ctban.paidValue,
      // });
      ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).collectedTotal +=
        ctban.paidValue;
      ctbansGroupByCustomer.get(
        ctban.donBanHang.customer.id,
      ).notCollectedTotal += ctban.finalValue - ctban.paidValue;
      const paymentTerm = new Date(ctban.paymentTerm);
      paymentTerm.setHours(8, 0, 0, 0);
      if (paymentTerm.getTime() < now.getTime()) {
        ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).ctbans.push({
          ctban: ctban,
          collected: ctban.paidValue,
          notCollected: ctban.finalValue - ctban.paidValue,
          inOfDate: 0,
          outOfDate: ctban.finalValue - ctban.paidValue,
        });
        ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).outOfDate +=
          ctban.finalValue - ctban.paidValue;
      } else {
        ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).ctbans.push({
          ctban: ctban,
          collected: ctban.paidValue,
          notCollected: ctban.finalValue - ctban.paidValue,
          inOfDate: ctban.finalValue - ctban.paidValue,
          outOfDate: 0,
        });
        ctbansGroupByCustomer.get(ctban.donBanHang.customer.id).inOfDate +=
          ctban.finalValue - ctban.paidValue;
      }
    }
    return Array.from(ctbansGroupByCustomer.values());
  }

  async findBySalespersons(
    startDate: Date = new Date(0),
    endDate: Date = new Date(),
    salespersons: Salesperson[],
  ) {
    const ctbans = await Promise.all(
      salespersons.map(async (salesperson) => {
        const ctbansOfSalesperson =
          await this.ctbanRepository.findBySalespersonAndDate(
            salesperson.id,
            startDate,
            endDate,
          );
        const totalProductValue = ctbansOfSalesperson.reduce(
          (acc, ctban) => acc + ctban.totalProductValue,
          0,
        );
        const totalDiscountValue = ctbansOfSalesperson.reduce(
          (acc, ctban) => acc + ctban.totalDiscountValue,
          0,
        );
        return {
          ctbans: ctbansOfSalesperson,
          salesperson: salesperson,
          totalProductValue: totalProductValue,
          totalDiscountValue: totalDiscountValue,
        };
      }),
    );
    return ctbans;
  }

  async findAndGroupByProduct(
    startDate: Date = new Date(0),
    endDate: Date = new Date(),
  ) {
    const ctbans = await this.ctbanRepository.findByDate(startDate, endDate);
    const ctbansGroupByProduct = new Map();
    for (const ctban of ctbans) {
      for (const productOfCtban of ctban.productOfCtban) {
        if (!ctbansGroupByProduct.has(productOfCtban.product.id)) {
          ctbansGroupByProduct.set(productOfCtban.product.id, {
            product: productOfCtban.product,
            count: 0,
            totalProductValue: 0,
            totalDiscountValue: 0,
            ctbans: [],
          });
        }
        ctbansGroupByProduct.get(productOfCtban.product.id).count +=
          productOfCtban.count;
        ctbansGroupByProduct.get(productOfCtban.product.id).totalProductValue +=
          productOfCtban.count * productOfCtban.price;
        ctbansGroupByProduct.get(
          productOfCtban.product.id,
        ).totalDiscountValue +=
          (productOfCtban.count *
            productOfCtban.price *
            ctban.donBanHang.discountRate) /
          100;
        ctbansGroupByProduct.get(productOfCtban.product.id).ctbans.push(ctban);
      }
    }
    const arr = Array.from(ctbansGroupByProduct.values());
    arr.sort((a, b) => b.totalProductValue - a.totalProductValue);
    return arr;
  }

  async reportRevenueOfYear(year: number) {
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
    const ctbans = await this.ctbanRepository.findAllOfOneYear(
      startDate,
      endDate,
    );
    const ctbansGroupByMonth = new Map();
    for (let i = 1; i < 13; i++) {
      ctbansGroupByMonth.set(i, {
        month: i,
        totalProductValue: 0,
        totalDiscountValue: 0,
        totalTaxValue: 0,
        totalFinalValue: 0,
        ctbans: [],
      });
    }
    for (const ctban of ctbans) {
      const createdAt = new Date(ctban.createdAt);
      const month = createdAt.getMonth() + 1;
      if (!ctbansGroupByMonth.has(month)) {
        ctbansGroupByMonth.set(month, {
          month: month,
          totalProductValue: 0,
          totalDiscountValue: 0,
          totalTaxValue: 0,
          totalFinalValue: 0,
          ctbans: [],
        });
      }
      ctbansGroupByMonth.get(month).totalProductValue +=
        ctban.totalProductValue;
      ctbansGroupByMonth.get(month).totalDiscountValue +=
        ctban.totalDiscountValue;
      ctbansGroupByMonth.get(month).totalTaxValue += ctban.totalTaxValue;
      ctbansGroupByMonth.get(month).totalFinalValue += ctban.finalValue;
      ctbansGroupByMonth.get(month).ctbans.push(ctban);
    }
    return Array.from(ctbansGroupByMonth.values());
  }

  async reportRevenueOfQuarter(year: number, quarter: number) {
    const startDate = new Date(year, (quarter - 1) * 3, 1, 0, 0, 0, 0);
    const endDate = new Date(year, (quarter - 1) * 3 + 2, 31, 23, 59, 59, 999);
    const ctbans = await this.ctbanRepository.findAllOfOneYear(
      startDate,
      endDate,
    );
    const ctbansGroupByMonth = new Map();
    for (let i = (quarter - 1) * 3 + 1; i < (quarter - 1) * 3 + 4; i++) {
      ctbansGroupByMonth.set(i, {
        month: i,
        totalProductValue: 0,
        totalDiscountValue: 0,
        totalTaxValue: 0,
        totalFinalValue: 0,
        ctbans: [],
      });
    }
    for (const ctban of ctbans) {
      const createdAt = new Date(ctban.createdAt);
      const month = createdAt.getMonth() + 1;
      if (!ctbansGroupByMonth.has(month)) {
        ctbansGroupByMonth.set(month, {
          month: month,
          totalProductValue: 0,
          totalDiscountValue: 0,
          totalTaxValue: 0,
          totalFinalValue: 0,
          ctbans: [],
        });
      }
      ctbansGroupByMonth.get(month).totalProductValue +=
        ctban.totalProductValue;
      ctbansGroupByMonth.get(month).totalDiscountValue +=
        ctban.totalDiscountValue;
      ctbansGroupByMonth.get(month).totalTaxValue += ctban.totalTaxValue;
      ctbansGroupByMonth.get(month).totalFinalValue += ctban.finalValue;
      ctbansGroupByMonth.get(month).ctbans.push(ctban);
    }
    return Array.from(ctbansGroupByMonth.values());
  }

  async reportRevenueOfMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(year, month - 1, 31, 23, 59, 59, 999);
    const ctbans = await this.ctbanRepository.findAllOfOneYear(
      startDate,
      endDate,
    );
    const ctbansGroupByDay = new Map();
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        for (let i = 1; i < 32; i++) {
          ctbansGroupByDay.set(i, {
            day: i,
            totalProductValue: 0,
            totalDiscountValue: 0,
            totalTaxValue: 0,
            totalFinalValue: 0,
            ctbans: [],
          });
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        for (let i = 1; i < 31; i++) {
          ctbansGroupByDay.set(i, {
            day: i,
            totalProductValue: 0,
            totalDiscountValue: 0,
            totalTaxValue: 0,
            totalFinalValue: 0,
            ctbans: [],
          });
        }
        break;
      case 2:
        for (let i = 1; i < 29; i++) {
          ctbansGroupByDay.set(i, {
            day: i,
            totalProductValue: 0,
            totalDiscountValue: 0,
            totalTaxValue: 0,
            totalFinalValue: 0,
            ctbans: [],
          });
        }
        break;
    }
    for (const ctban of ctbans) {
      const createdAt = new Date(ctban.createdAt);
      const day = createdAt.getDate();
      if (!ctbansGroupByDay.has(day)) {
        ctbansGroupByDay.set(day, {
          day: day,
          totalProductValue: 0,
          totalDiscountValue: 0,
          totalTaxValue: 0,
          totalFinalValue: 0,
          ctbans: [],
        });
      }
      ctbansGroupByDay.get(day).totalProductValue += ctban.totalProductValue;
      ctbansGroupByDay.get(day).totalDiscountValue += ctban.totalDiscountValue;
      ctbansGroupByDay.get(day).totalTaxValue += ctban.totalTaxValue;
      ctbansGroupByDay.get(day).totalFinalValue += ctban.finalValue;
      ctbansGroupByDay.get(day).ctbans.push(ctban);
    }
    return Array.from(ctbansGroupByDay.values());
  }

  async findByDate(startDate: Date = new Date(0), endDate: Date = new Date()) {
    return this.ctbanRepository.findByDate(startDate, endDate);
  }

  async makePayment(id: number, money: number) {
    const ctban = await this.findOne(id);
    if (ctban.paidValue + money > ctban.finalValue) {
      throw new ConflictException('Số tiền thanh toán không hợp lệ');
    }
    await this.ctbanRepository.makePayment(id, money + ctban.paidValue);
    if (money + ctban.paidValue === ctban.finalValue) {
      await this.ctbanRepository.updatePaymentStatus(id, PAYMENT_STATUS.PAID);
    } else if (money + ctban.paidValue > 0) {
      await this.ctbanRepository.updatePaymentStatus(
        id,
        PAYMENT_STATUS.BEING_PAID,
      );
    } else {
      await this.ctbanRepository.updatePaymentStatus(
        id,
        PAYMENT_STATUS.NOT_PAID,
      );
    }
  }

  update(id: number, updateCtbanDto: UpdateCtbanDto) {
    return `This action updates a #${id} ctban`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctban`;
  }
}
