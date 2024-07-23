import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateCtmuaDto } from './dto/create-ctmua.dto';
import { UpdateCtmuaDto } from './dto/update-ctmua.dto';
import { GetCtmuaDto } from './dto/get-ctmua.dto';
import { CtmuaRepository } from './ctmua.repository';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { EmployeeService } from '../employee/employee.service';
import { DonMuaHangService } from '../don-mua-hang/don-mua-hang.service';

@Injectable()
export class CtmuaService {
  constructor(
    private readonly ctmuaRepository: CtmuaRepository,
    private readonly employeeService: EmployeeService,
    private readonly donMuaHangService: DonMuaHangService,
  ) {}

  async create(createCtmuaDto: CreateCtmuaDto) {
    const warehouseKeeper = await this.employeeService.findOneWarehouseKeeper(
      createCtmuaDto.warehouseKeeperId,
    );

    const donMuaHang = await this.donMuaHangService.findOne(
      createCtmuaDto.donMuaHangId,
    );

    return this.ctmuaRepository.create(
      createCtmuaDto,
      warehouseKeeper,
      donMuaHang,
    );
  }

  async findAll() {
    return this.ctmuaRepository.findAll();
  }

  async findOne(id: number) {
    const ctmua = await this.ctmuaRepository.findOne(id);
    if (!ctmua) {
      throw new NotFoundException(`Ctmua with id ${id} not found`);
    }
    return ctmua;
  }

  update(id: number, updateCtmuaDto: UpdateCtmuaDto) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
