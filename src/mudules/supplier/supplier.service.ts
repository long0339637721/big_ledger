import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateSupplierDto,
  CreateSupplierGroupDto,
} from './dto/create-supplier.dto';
import {
  UpdateSupplierDto,
  UpdateSupplierGroupDto,
} from './dto/update-supplier.dto';
import { SupplierRepository } from './supplier.repository';
import { AddProductDto } from './dto/add-product.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class SupplierService {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly productService: ProductService,
  ) {}

  createGroup(createSupplierGroupDto: CreateSupplierGroupDto) {
    return this.supplierRepository.createGroup(createSupplierGroupDto);
  }

  async create(createSupplierDto: CreateSupplierDto) {
    const supplierGroup = await this.supplierRepository.findOneGroup(
      createSupplierDto.supplierGroupId,
    );
    if (!supplierGroup) {
      throw new Error('Supplier group not found');
    }
    return this.supplierRepository.create(createSupplierDto, supplierGroup);
  }

  findAllGroup() {
    return this.supplierRepository.findAllGroup();
  }

  findAll() {
    return this.supplierRepository.findAll();
  }

  findOneGroup(id: number) {
    return this.supplierRepository.findOneGroup(id);
  }

  async findOne(id: number) {
    const supplier = await this.supplierRepository.findOne(id);
    if (!supplier) {
      throw new NotFoundException(`Supplier with ${id} not found`);
    }
    return supplier;
  }

  async updateGroup(
    id: number,
    updateSupplierGroupDto: UpdateSupplierGroupDto,
  ) {
    await this.findOneGroup(id);
    return this.supplierRepository.updateGroup(id, updateSupplierGroupDto);
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    await this.findOne(id);
    return this.supplierRepository.update(id, updateSupplierDto);
  }

  async addProducts(id: number, addProductDto: AddProductDto) {
    const supplier = await this.findOne(id);
    const productsOfSuppliers = supplier.products;
    const products = await this.productService.findByIds(
      addProductDto.productIds,
    );
    products.forEach((each) => {
      if (!productsOfSuppliers.includes(each)) {
        productsOfSuppliers.push(each);
      }
    });

    return this.supplierRepository.addProducts(supplier, productsOfSuppliers);
  }

  removeGroup(id: number) {
    return this.supplierRepository.removeGroup(id);
  }

  remove(id: number) {
    return this.supplierRepository.remove(id);
  }
}
