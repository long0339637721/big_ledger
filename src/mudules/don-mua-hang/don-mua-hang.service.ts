import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DonMuaHangRepository } from './don-mua-hang.repository';
import { CreateDonMuaHangDto } from './dto/create-don-mua-hang.dto';
import { UpdateDonMuaHangDto } from './dto/update-don-mua-hang.dto';
import { EmployeeService } from '../employee/employee.service';
import { SupplierService } from '../supplier/supplier.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class DonMuaHangService {
  constructor(
    private readonly donMuaHangRepository: DonMuaHangRepository,
    private readonly employeeService: EmployeeService,
    private readonly supplierService: SupplierService,
    private readonly productService: ProductService,
  ) {}

  async create(createDto: CreateDonMuaHangDto) {
    const purchasingOfficer =
      await this.employeeService.findOnePurchasingOfficer(
        createDto.purchasingOfficerId,
      );
    const supplier = await this.supplierService.findOne(createDto.supplierId);
    const productsOfSuppliers = supplier.products.map((each) => each.id);
    createDto.products.forEach((each) => {
      if (!productsOfSuppliers.includes(each.productId)) {
        throw new ConflictException(
          `Product with ${each.productId} not found in supplier with ${createDto.supplierId}`,
        );
      }
    });
    const productsOfDonMuaHangs = await Promise.all(
      createDto.products.map(async (each) => {
        const product = await this.productService.findOne(each.productId);
        return {
          product: product,
          count: each.count,
          price: each.price,
        };
      }),
    );

    return this.donMuaHangRepository.create(
      createDto,
      purchasingOfficer,
      supplier,
      productsOfDonMuaHangs,
    );
  }

  async findAll() {
    const donMuaHangs = await this.donMuaHangRepository.findAll();
    return donMuaHangs;
  }

  async findOne(id: number) {
    const donMuaHang = await this.donMuaHangRepository.findOne(id);
    if (!donMuaHang) {
      throw new NotFoundException(`Don mua hang with ${id} not found`);
    }
    return donMuaHang;
  }

  update(id: number, updateDonMuaHangDto: UpdateDonMuaHangDto) {
    return `This action updates a #${id} donMuaHang`;
  }

  remove(id: number) {
    return `This action removes a #${id} donMuaHang`;
  }
}
