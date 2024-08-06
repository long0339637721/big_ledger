import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
} from './dto/create-phieu-chi.dto';
import {
  UpdatePhieuChiTienMatDto,
  UpdatePhieuChiTienGuiDto,
} from './dto/update-phieu-chi.dto';
import { PhieuChiRepository } from './phieu-chi.repository';
import { EmployeeService } from '../employee/employee.service';
import { SupplierService } from '../supplier/supplier.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { CtmuaService } from '../ctmua/ctmua.service';

@Injectable()
export class PhieuChiService {
  constructor(
    private readonly phieuChiRepository: PhieuChiRepository,
    private readonly employeeService: EmployeeService,
    private readonly supplierService: SupplierService,
    private readonly bankAccountService: BankAccountService,
    private readonly ctmuaService: CtmuaService,
  ) {}

  // Tien mat

  async createTienMat(createPhieuChiDto: CreatePhieuChiTienMatDto) {
    const supplier = await this.supplierService.findOne(
      createPhieuChiDto.supplierId,
    );
    const purchasingOfficer =
      await this.employeeService.findOnePurchasingOfficer(
        createPhieuChiDto.purchasingOfficerId,
      );
    const chungTus = await Promise.all(
      createPhieuChiDto.chungTu.map(async (chungtu) => {
        const ctmua = await this.ctmuaService.findOne(chungtu.ctmuaId);
        return {
          ctmua: ctmua,
          money: chungtu.money,
          content: chungtu.content ?? '',
        };
      }),
    );
    chungTus.forEach((ct) => {
      if (ct.ctmua.paidValue + ct.money > ct.ctmua.finalValue) {
        throw new ConflictException('Paid value exceeds final value');
      }
    });

    const phieuChi = await this.phieuChiRepository.createPhieuChiTienMat(
      createPhieuChiDto,
      supplier,
      purchasingOfficer,
      chungTus,
    );

    await Promise.all(
      chungTus.map(async (ct) => {
        await this.ctmuaService.checkAndUpdatePaymentStatus(ct.ctmua.id);
      }),
    );

    return phieuChi;
  }

  findAllTienMat() {
    return this.phieuChiRepository.findAllPhieuChiTienMat();
  }

  async findOneTienMat(id: number) {
    const phieuChi = await this.phieuChiRepository.findOnePhieuChiTienMat(id);
    if (!phieuChi) {
      throw new NotFoundException(`Phieu chi with id ${id} not found`);
    }
    return phieuChi;
  }

  updateTienMat(id: number, updatePhieuChiDto: UpdatePhieuChiTienMatDto) {
    return this.phieuChiRepository.updatePhieuChiTienMat(id, updatePhieuChiDto);
  }

  async removeTienMat(id: number) {
    const phieuChi = await this.findOneTienMat(id);
    return this.phieuChiRepository.removePhieuChiTienMat(id);
  }

  // Tien gui

  async createTienGui(createPhieuChiDto: CreatePhieuChiTienGuiDto) {
    const supplier = await this.supplierService.findOne(
      createPhieuChiDto.supplierId,
    );
    const purchasingOfficer =
      await this.employeeService.findOnePurchasingOfficer(
        createPhieuChiDto.purchasingOfficerId,
      );
    const bankAccount = await this.bankAccountService.findOne(
      createPhieuChiDto.bankAccountId,
    );

    const chungTus = await Promise.all(
      createPhieuChiDto.chungTu.map(async (chungtu) => {
        const ctmua = await this.ctmuaService.findOne(chungtu.ctmuaId);
        return {
          ctmua: ctmua,
          money: chungtu.money,
          content: chungtu.content ?? '',
        };
      }),
    );
    chungTus.forEach((ct) => {
      if (ct.ctmua.paidValue + ct.money > ct.ctmua.finalValue) {
        throw new ConflictException('Paid value exceeds final value');
      }
    });

    const phieuChi = await this.phieuChiRepository.createPhieuChiTienGui(
      createPhieuChiDto,
      supplier,
      purchasingOfficer,
      bankAccount,
      chungTus,
    );

    await Promise.all(
      chungTus.map(async (ct) => {
        await this.ctmuaService.checkAndUpdatePaymentStatus(ct.ctmua.id);
      }),
    );

    return phieuChi;
  }

  findAllTienGui() {
    return this.phieuChiRepository.findAllPhieuChiTienGui();
  }

  async findOneTienGui(id: number) {
    const phieuChi = await this.phieuChiRepository.findOnePhieuChiTienGui(id);
    if (!phieuChi) {
      throw new NotFoundException(`Phieu chi with id ${id} not found`);
    }
    return phieuChi;
  }

  updateTienGui(id: number, updatePhieuChiDto: UpdatePhieuChiTienGuiDto) {
    return this.phieuChiRepository.updatePhieuChiTienGui(id, updatePhieuChiDto);
  }

  async removeTienGui(id: number) {
    const phieuChi = await this.findOneTienGui(id);
    return this.phieuChiRepository.removePhieuChiTienGui(id);
  }
}
