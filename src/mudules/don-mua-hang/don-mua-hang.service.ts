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
import { Product } from '../product/entities/product.entity';
import { DOCUMENT_STATUS } from 'src/constants';

@Injectable()
export class DonMuaHangService {
  constructor(
    private readonly donMuaHangRepository: DonMuaHangRepository,
    private readonly employeeService: EmployeeService,
    private readonly supplierService: SupplierService,
    private readonly productService: ProductService,
  ) {}

  async create(createDto: CreateDonMuaHangDto, raw = false) {
    const purchasingOfficer =
      await this.employeeService.findOnePurchasingOfficer(
        createDto.purchasingOfficerId,
      );
    const supplier = await this.supplierService.findOne(createDto.supplierId);
    const productsOfSuppliers = supplier.products.map((each) => each.id);
    const productsOfDonMuaHangs = await Promise.all(
      createDto.products.map(async (each) => {
        if (!productsOfSuppliers.includes(each.productId)) {
          throw new ConflictException(
            `Product with ${each.productId} not found in supplier with ${createDto.supplierId}`,
          );
        }
        const product = await this.productService.findOne(each.productId);
        return {
          product: product,
          count: each.count,
          price: each.price,
        };
      }),
    );

    const donMuaHang = await this.donMuaHangRepository.create(
      createDto,
      purchasingOfficer,
      supplier,
      productsOfDonMuaHangs,
      raw,
    );

    productsOfDonMuaHangs.forEach(async (each) => {
      await this.productService.orderProduct(each.product.id, each.count, true);
    });

    return donMuaHang;
  }

  findAll() {
    return this.donMuaHangRepository.findAll();
  }

  async findOne(id: number) {
    const donMuaHang = await this.donMuaHangRepository.findOne(id);
    if (!donMuaHang) {
      throw new NotFoundException(`Don mua hang with ${id} not found`);
    }
    return donMuaHang;
  }

  async deliverDonMuaHang(id: number, product: Product, count: number) {
    const donMuaHang = await this.findOne(id);
    const productOfDonMuaHang = donMuaHang.productOfDonMuaHangs.find(
      (each) => each.product.id === product.id,
    );
    if (!productOfDonMuaHang) {
      throw new ConflictException(
        `Product with ${product.id} not found in DonMuaHang with ${id}`,
      );
    }
    if (productOfDonMuaHang.count - productOfDonMuaHang.delivered < count) {
      throw new ConflictException(
        `Product with ${product.id} out of stock in DonMuaHang with ${id}`,
      );
    }
    return this.donMuaHangRepository.deliverDonMuaHang(
      productOfDonMuaHang.id,
      productOfDonMuaHang.delivered + count,
    );
  }

  async checkAndUpdateDocumentStatus(donMuaHangId: number) {
    const donMuaHang = await this.findOne(donMuaHangId);
    const productOfDonMuaHangs = donMuaHang.productOfDonMuaHangs;
    let delivered = 0;
    let count = 0;
    if (productOfDonMuaHangs.length === 0) {
      return;
    }
    for (const productOfDonBanHang of productOfDonMuaHangs) {
      delivered += productOfDonBanHang.delivered;
      count += productOfDonBanHang.count;
    }
    if (delivered === count) {
      return this.donMuaHangRepository.updateDocumentStatus(
        donMuaHangId,
        DOCUMENT_STATUS.DOCUMENTED,
      );
    } else if (delivered === 0) {
      return this.donMuaHangRepository.updateDocumentStatus(
        donMuaHangId,
        DOCUMENT_STATUS.UNDOCUMENTED,
      );
    } else {
      return this.donMuaHangRepository.updateDocumentStatus(
        donMuaHangId,
        DOCUMENT_STATUS.DOCUMENTING,
      );
    }
  }

  update(id: number, updateDonMuaHangDto: UpdateDonMuaHangDto) {
    return `This action updates a #${id} donMuaHang`;
  }

  remove(id: number) {
    return `This action removes a #${id} donMuaHang`;
  }
}
