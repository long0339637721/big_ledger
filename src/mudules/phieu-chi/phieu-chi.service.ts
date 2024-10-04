import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
  CreatePhieuChiKhacDto,
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
import { GetPhieuChiDto } from './dto/get-phieu-chi.dto';

@Injectable()
export class PhieuChiService {
  constructor(
    private readonly phieuChiRepository: PhieuChiRepository,
    private readonly employeeService: EmployeeService,
    private readonly supplierService: SupplierService,
    @Inject(forwardRef(() => BankAccountService))
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

  async reconcileTienGui(id: number) {
    const phieuChi = await this.findOneTienGui(id);
    return this.phieuChiRepository.reconcilePhieuChiTienGui(id);
  }

  // Khac

  async createKhac(createPhieuChiDto: CreatePhieuChiKhacDto) {
    const accountant = await this.employeeService.findOneAccountantOrAdmin(
      createPhieuChiDto.accountantId,
    );
    const bankAccount = createPhieuChiDto.bankAccountId
      ? await this.bankAccountService.findOne(createPhieuChiDto.bankAccountId)
      : undefined;
    return this.phieuChiRepository.createPhieuChiKhac(
      createPhieuChiDto,
      accountant,
      bankAccount,
    );
  }

  findAllKhac() {
    return this.phieuChiRepository.findAllPhieuChiKhac();
  }

  findAllKhacByDate(startDate: Date = new Date(), endDate: Date = new Date()) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    return this.phieuChiRepository.findByDatePhieuChiKhac(startDate, endDate);
  }

  async findOneKhac(id: number) {
    const phieuChi = await this.phieuChiRepository.findOnePhieuChiKhac(id);
    if (!phieuChi) {
      throw new NotFoundException(`Phieu chi with id ${id} not found`);
    }
    return phieuChi;
  }

  reconcileKhac(id: number) {
    return this.phieuChiRepository.reconcilePhieuChiKhac(id);
  }

  // Common

  findByDate(
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    isTienMat: 'tienMat' | 'tienGui' | 'khac' | 'all',
  ) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    switch (isTienMat) {
      case 'tienMat':
        return this.phieuChiRepository.findByDatePhieuChiTienMat(
          startDate,
          endDate,
        );
      case 'tienGui':
        return this.phieuChiRepository.findByDatePhieuChiTienGui(
          startDate,
          endDate,
        );
      case 'khac':
        return this.phieuChiRepository.findByDatePhieuChiKhac(
          startDate,
          endDate,
        );
      case 'all':
        const tienMat = this.phieuChiRepository.findByDatePhieuChiTienMat(
          startDate,
          endDate,
        );
        const tienGui = this.phieuChiRepository.findByDatePhieuChiTienGui(
          startDate,
          endDate,
        );
        const khac = this.phieuChiRepository.findByDatePhieuChiKhac(
          startDate,
          endDate,
        );
        return [tienMat, tienGui, khac];
      default:
        throw new NotFoundException('Invalid type');
    }
  }
}
