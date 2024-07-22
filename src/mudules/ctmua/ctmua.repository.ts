import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Ctmua } from './entities/ctmua.entity';
import { CreateCtmuaDto } from './dto/create-ctmua.dto';
import { WarehouseKeeper } from '../employee/entities/employee.entity';
import { DonMuaHang } from '../don-mua-hang/entities/don-mua-hang.entity';

@Injectable()
export class CtmuaRepository {
  private readonly ctmuaRepository: Repository<Ctmua>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.ctmuaRepository = this.dataSource.getRepository(Ctmua);
  }

  create(
    createCtmuaDto: CreateCtmuaDto,
    warehouseKeeper: WarehouseKeeper,
    donMuaHangs: DonMuaHang[],
  ) {
    const newCtmua = this.ctmuaRepository.create({
      ...createCtmuaDto,
      warehouseKeeper: warehouseKeeper,
      donMuaHangs: donMuaHangs,
    });
    return this.ctmuaRepository.save(newCtmua);
  }

  findAll() {
    return this.ctmuaRepository.find({
      relations: {
        warehouseKeeper: true,
        donMuaHangs: true,
        productOfCtmua: true,
        phieuChi: true,
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
        donMuaHangs: true,
        productOfCtmua: true,
        phieuChi: true,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
