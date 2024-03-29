import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ctban } from './entities/ctban.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCtbanDto } from './dto/create-ctban.dto';
import { WarehouseKeeper } from '../employee/entities/employee.entity';
import { DonBanHang } from '../don-ban-hang/entities/don-ban-hang.entity';
import { UpdateCtbanDto } from './dto/update-ctban.dto';
import { OrderType } from 'src/constants';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class CtbanRepository {
  private readonly ctbanRepository: Repository<Ctban>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.ctbanRepository = this.dataSource.getRepository(Ctban);
  }

  create(
    createCtbanDto: CreateCtbanDto,
    warehouseKeeper: WarehouseKeeper,
    donBanHangs: DonBanHang[],
    customer: Customer,
  ) {
    const newCtban = this.ctbanRepository.create({
      ...createCtbanDto,
      warehouseKeeper: warehouseKeeper,
      donBanHangs: donBanHangs,
      customer: customer,
    });
    return this.ctbanRepository.save(newCtban);
  }

  findAll(currentPage: number, pageSize: number, sorts: [string, OrderType][]) {
    let sortsObject: { [key: string]: OrderType } = {};
    sorts.forEach(([key, value]) => {
      sortsObject[key] = value;
    });
    return this.ctbanRepository.findAndCount({
      relations: {
        warehouseKeeper: true,
        donBanHangs: true,
        productOfCtban: true,
        phieuThu: true,
      },
      take: pageSize,
      skip: pageSize * (currentPage - 1),
    });
  }

  findOne(id: number) {
    return this.ctbanRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        warehouseKeeper: true,
        donBanHangs: true,
        productOfCtban: true,
        phieuThu: true,
      },
    });
  }

  update(id: number, updateCtbanDto: UpdateCtbanDto) {
    return this.ctbanRepository.update(id, updateCtbanDto);
  }

  remove(id: number) {
    return this.ctbanRepository.delete(id);
  }
}
