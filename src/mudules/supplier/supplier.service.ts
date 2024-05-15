import { Injectable } from '@nestjs/common';

import {
  CreateSupplierDto,
  CreateSupplierGroupDto,
} from './dto/create-supplier.dto';
import {
  UpdateSupplierDto,
  UpdateSupplierGroupDto,
} from './dto/update-supplier.dto';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

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

  findOne(id: number) {
    return this.supplierRepository.findOne(id);
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

  removeGroup(id: number) {
    return this.supplierRepository.removeGroup(id);
  }

  remove(id: number) {
    return this.supplierRepository.remove(id);
  }
}
