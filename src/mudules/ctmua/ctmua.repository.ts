import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Ctmua, ProductOfCtmua } from './entities/ctmua.entity';
import { CreateCtmuaDto } from './dto/create-ctmua.dto';
import { WarehouseKeeper } from '../employee/entities/employee.entity';
import { DonMuaHang } from '../don-mua-hang/entities/don-mua-hang.entity';
import { Product } from '../product/entities/product.entity';
import { PaymentStatusType } from 'src/constants';

@Injectable()
export class CtmuaRepository {
  private readonly ctmuaRepository: Repository<Ctmua>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.ctmuaRepository = this.dataSource.getRepository(Ctmua);
  }

  create(
    createCtmuaDto: CreateCtmuaDto,
    warehouseKeeper: WarehouseKeeper,
    donMuaHang: DonMuaHang,
    totalProductValue: number,
    totalDiscountValue: number,
    finalValue: number,
    productOfCtmuas: {
      product: Product;
      count: number;
      price: number;
    }[],
  ) {
    const newCtmua = this.ctmuaRepository.create({
      ...createCtmuaDto,
      warehouseKeeper: warehouseKeeper,
      donMuaHang: donMuaHang,
      totalProductValue: totalProductValue,
      totalDiscountValue: totalDiscountValue,
      finalValue: finalValue,
    });
    return this.dataSource.transaction(async (manager) => {
      const ctmua = await manager.save<Ctmua>(newCtmua);
      await Promise.all(
        productOfCtmuas.map(async (each) => {
          const productOfCtmua = manager.create(ProductOfCtmua, {
            product: each.product,
            count: each.count,
            price: each.price,
            ctmua: ctmua,
          });
          await manager.save(productOfCtmua);
        }),
      );
      return ctmua;
    });
  }

  findAll() {
    return this.ctmuaRepository.find({
      relations: {
        warehouseKeeper: true,
        donMuaHang: {
          supplier: true,
          productOfDonMuaHangs: true,
        },
        productOfCtmua: {
          product: true,
        },
        phieuChiTienGui: {
          phieuChiTienGui: {
            bankAccount: true,
          },
        },
        phieuChiTienMat: true,
      },
    });
  }

  findOne(id: number) {
    return this.ctmuaRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        warehouseKeeper: true,
        donMuaHang: {
          supplier: true,
          productOfDonMuaHangs: true,
        },
        productOfCtmua: {
          product: true,
        },
        phieuChiTienGui: {
          phieuChiTienGui: {
            bankAccount: true,
          },
        },
        phieuChiTienMat: true,
      },
    });
  }

  updatePaymentStatus(id: number, status: PaymentStatusType) {
    return this.ctmuaRepository.update(id, {
      paymentStatus: status,
    });
  }

  update(id: number) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
