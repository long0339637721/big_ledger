import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePhieuThuTienGuiDto,
  CreatePhieuThuTienMatDto,
} from './dto/create-phieu-thu.dto';
import {
  UpdatePhieuThuTienGuiDto,
  UpdatePhieuThuTienMatDto,
} from './dto/update-phieu-thu.dto';
import { PhieuThuRepository } from './phieu-thu.repository';
import { CustomerService } from '../customer/customer.service';
import { EmployeeService } from '../employee/employee.service';
import { CtbanService } from '../ctban/ctban.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PhieuThuService {
  constructor(
    private readonly phieuThuRepository: PhieuThuRepository,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly ctbanService: CtbanService,
    @Inject(forwardRef(() => BankAccountService))
    private readonly bankAccountService: BankAccountService,
  ) {}

  // Tien mat

  async createTienMat(createPhieuThuDto: CreatePhieuThuTienMatDto) {
    const customer = await this.customerService.findOne(
      createPhieuThuDto.customerId,
    );
    const salesperson = await this.employeeService.findOneSalesperson(
      createPhieuThuDto.salespersonID,
    );
    const chungTus = await Promise.all(
      createPhieuThuDto.chungTuDto.map(async (chungtu) => {
        const ctban = await this.ctbanService.findOne(chungtu.ctbanId);
        return {
          ctban: ctban,
          money: chungtu.money,
          content: chungtu.content ?? '',
        };
      }),
    );

    chungTus.forEach(async (ct) => {
      await this.ctbanService.makePayment(ct.ctban.id, ct.money);
    });

    return this.phieuThuRepository.createPhieuThuTienMat(
      createPhieuThuDto,
      customer,
      salesperson,
      chungTus,
    );
  }

  async findAllTienMat() {
    const phieuThu = await this.phieuThuRepository.findAllPhieuThuTienMat();
    const pagination = new PaginationDto(1, 9999, 1, phieuThu[1]);
    return {
      data: phieuThu[0],
      pagination: pagination,
    };
  }

  async findOneTienMat(id: number) {
    const phieuThu = await this.phieuThuRepository.findOnePhieuThuTienMat(id);
    if (!phieuThu) {
      throw new NotFoundException('PhieuThu not found');
    }
    return phieuThu;
  }

  updateTienMat(id: number, updatePhieuThuDto: UpdatePhieuThuTienMatDto) {
    return `This action updates a #${id} phieuThu`;
  }

  removeTienMat(id: number) {
    return `This action removes a #${id} phieuThu`;
  }

  // Tien gui

  async createTienGui(createPhieuThuDto: CreatePhieuThuTienGuiDto) {
    const customer = await this.customerService.findOne(
      createPhieuThuDto.customerId,
    );
    const salesperson = await this.employeeService.findOneSalesperson(
      createPhieuThuDto.salespersonID,
    );
    const bankAccount = await this.bankAccountService.findOne(
      createPhieuThuDto.bankAccountId,
    );
    const chungTus = await Promise.all(
      createPhieuThuDto.chungTuDto.map(async (chungtu) => {
        const ctban = await this.ctbanService.findOne(chungtu.ctbanId);
        return {
          ctban: ctban,
          money: chungtu.money,
          content: chungtu.content ?? '',
          bankAccount: bankAccount,
        };
      }),
    );

    chungTus.forEach(async (ct) => {
      await this.ctbanService.makePayment(ct.ctban.id, ct.money);
    });

    return this.phieuThuRepository.createPhieuThuTienGui(
      createPhieuThuDto,
      customer,
      salesperson,
      chungTus,
      bankAccount,
    );
  }

  async findAllTienGui() {
    const phieuThu = await this.phieuThuRepository.findAllPhieuThuTienGui();
    const pagination = new PaginationDto(1, 9999, 1, phieuThu[1]);
    return {
      data: phieuThu[0],
      pagination: pagination,
    };
  }

  async findOneTienGui(id: number) {
    const phieuThu = await this.phieuThuRepository.findOnePhieuThuTienGui(id);
    if (!phieuThu) {
      throw new NotFoundException('PhieuThu not found');
    }
    return phieuThu;
  }

  updateTienGui(id: number, updatePhieuThuDto: UpdatePhieuThuTienGuiDto) {
    return `This action updates a #${id} phieuThu`;
  }

  removeTienGui(id: number) {
    return `This action removes a #${id} phieuThu`;
  }
}
