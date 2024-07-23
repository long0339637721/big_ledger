import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Supplier, SupplierGroup } from './entities';
import {
  CreateSupplierDto,
  CreateSupplierGroupDto,
} from './dto/create-supplier.dto';
import {
  UpdateSupplierDto,
  UpdateSupplierGroupDto,
} from './dto/update-supplier.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class SupplierRepository {
  private readonly supplierRepository: Repository<Supplier>;
  private readonly supplierGroupRepository: Repository<SupplierGroup>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.supplierRepository = this.dataSource.getRepository(Supplier);
    this.supplierGroupRepository = this.dataSource.getRepository(SupplierGroup);
  }

  createGroup(createSupplierGroup: CreateSupplierGroupDto) {
    const newSupplierGroup =
      this.supplierGroupRepository.create(createSupplierGroup);
    return this.supplierGroupRepository.save(newSupplierGroup);
  }

  create(createSupplierDto: CreateSupplierDto, supplierGroup: SupplierGroup) {
    const newSupplier = this.supplierRepository.create({
      ...createSupplierDto,
      supplierGroup: supplierGroup,
    });
    return this.supplierRepository.save(newSupplier);
  }

  findAllGroup() {
    return this.supplierGroupRepository.find({
      relations: {
        suppliers: true,
      },
    });
  }

  findAll() {
    return this.supplierRepository.find({
      relations: {
        supplierGroup: true,
        products: true,
        donMuaHangs: true,
        phieuChi: true,
      },
    });
  }

  findOneGroup(id: number) {
    return this.supplierGroupRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        suppliers: true,
      },
    });
  }

  findOne(id: number) {
    return this.supplierRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        supplierGroup: true,
        products: true,
        donMuaHangs: true,
        phieuChi: true,
      },
    });
  }

  updateGroup(id: number, supplierGroup: UpdateSupplierGroupDto) {
    return this.supplierGroupRepository.update(id, supplierGroup);
  }

  update(id: number, supplier: UpdateSupplierDto) {
    return this.supplierRepository.update(id, supplier);
  }

  addProducts(supplier: Supplier, products: Product[]) {
    supplier.products = products;
    return this.supplierRepository.save(supplier);
  }

  removeGroup(id: number) {
    return this.supplierGroupRepository.delete(id);
  }

  remove(id: number) {
    return this.supplierRepository.delete(id);
  }
}
