import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { DonMuaHang } from './entities/don-mua-hang.entity';
import { CreateDonMuaHangDto } from './dto/create-don-mua-hang.dto';
import { PurchasingOfficer } from '../employee/entities/employee.entity';
import { Supplier } from '../supplier/entities';
import { OrderType } from 'src/constants';

@Injectable()
export class DonMuaHangRepository {
  private readonly donMuaHangRepository: Repository<DonMuaHang>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.donMuaHangRepository = this.dataSource.getRepository(DonMuaHang);
  }

  create(
    createDonMuaHangDto: CreateDonMuaHangDto,
    purchasingOfficer: PurchasingOfficer,
    supplier: Supplier,
    productOfDonMuaHangs: {
      product: any;
      count: number;
      price: number;
    }[],
  ) {
    const newDonMuaHang = this.donMuaHangRepository.create({
      ...createDonMuaHangDto,
      purchasingOfficer: purchasingOfficer,
      supplier: supplier,
    });
    return this.dataSource.transaction(async (manager) => {
      const donMuaHang = await manager.save(newDonMuaHang);
      await Promise.all(
        productOfDonMuaHangs.map(async (each) => {
          const productOfDonMuaHang = manager.create('ProductOfDonMuaHang', {
            product: each.product,
            count: each.count,
            price: each.price,
            donMuaHang: donMuaHang,
          });
          return manager.save(productOfDonMuaHang);
        }),
      );
      return donMuaHang;
    });
  }

  findAll() {
    return this.donMuaHangRepository.find({
      relations: {
        purchasingOfficer: true,
        supplier: true,
        productOfDonMuaHangs: {
          product: true,
        },
        ctmuas: true,
      },
    });
  }

  findOne(id: number) {
    return this.donMuaHangRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        purchasingOfficer: true,
        supplier: true,
        productOfDonMuaHangs: {
          product: true,
        },
        ctmuas: true,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} donMuaHang`;
  }

  remove(id: number) {
    return `This action removes a #${id} donMuaHang`;
  }
}
