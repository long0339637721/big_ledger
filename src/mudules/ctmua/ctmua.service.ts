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
    const nguoiNhanHang = await this.employeeService.findOneWarehouseKeeper(
      createCtmuaDto.nguoiNhanHangId,
    );
    if (!nguoiNhanHang) {
      throw new NotFoundException('Nguoi nhan hang not found');
    }

    if (createCtmuaDto.donMuaHangIds.length === 0) {
      throw new UnprocessableEntityException('Don mua hang ids is empty');
    }

    const donMuaHangs = await Promise.all(
      createCtmuaDto.donMuaHangIds.map((id) =>
        this.donMuaHangService.findOne(id),
      ),
    );
    donMuaHangs.forEach((donMuaHang, index) => {
      if (!donMuaHang) {
        throw new NotFoundException(
          `Don mua hang with id ${createCtmuaDto.donMuaHangIds[index]} not found`,
        );
      }
    });

    return this.ctmuaRepository.create(
      createCtmuaDto,
      nguoiNhanHang,
      donMuaHangs,
    );
  }

  async findAll(query: GetCtmuaDto) {
    const ctmuas = await this.ctmuaRepository.findAll(
      query.currentPage,
      query.pageSize,
    );
    const metaData = new PageMetaDto(query, ctmuas.length);
    return {
      metaData: metaData,
      data: ctmuas,
    };
  }

  async findOne(id: number) {
    const ctmua = await this.ctmuaRepository.findOne(id);
    if (!ctmua) {
      return 'Ctmua not found';
    }
    return {
      metaData: {},
      data: ctmua,
    };
  }

  update(id: number, updateCtmuaDto: UpdateCtmuaDto) {
    return `This action updates a #${id} ctmua`;
  }

  remove(id: number) {
    return `This action removes a #${id} ctmua`;
  }
}
