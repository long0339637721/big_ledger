import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Between, DataSource, Repository } from 'typeorm';
import {
  PhieuChiTienMat,
  PhieuChiTienGui,
  ChungTuCuaPhieuChiTienGui,
  ChungTuCuaPhieuChiTienMat,
  PhieuChiKhac,
} from './entities/phieu-chi.entity';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
  CreatePhieuChiKhacDto,
} from './dto/create-phieu-chi.dto';
import {
  UpdatePhieuChiTienMatDto,
  UpdatePhieuChiTienGuiDto,
  UpdatePhieuChiKhacDto,
} from './dto/update-phieu-chi.dto';
import { Supplier } from '../supplier/entities';
import {
  Accountant,
  PurchasingOfficer,
} from '../employee/entities/employee.entity';
import { Ctmua } from '../ctmua/entities/ctmua.entity';
import { BankAccount } from '../bank-account/entities/bank-account.entity';

@Injectable()
export class PhieuChiRepository {
  private readonly pcTienMatRepository: Repository<PhieuChiTienMat>;
  private readonly pcTienGuiRepository: Repository<PhieuChiTienGui>;
  private readonly pcKhacRepository: Repository<PhieuChiKhac>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.pcTienMatRepository = this.dataSource.getRepository(PhieuChiTienMat);
    this.pcTienGuiRepository = this.dataSource.getRepository(PhieuChiTienGui);
    this.pcKhacRepository = this.dataSource.getRepository(PhieuChiKhac);
  }

  // Tien mat

  createPhieuChiTienMat(
    createPhieuChiDto: CreatePhieuChiTienMatDto,
    supplier: Supplier,
    purchasingOfficer: PurchasingOfficer,
    chungtu: { ctmua: Ctmua; money: number; content: string }[],
  ) {
    const newPhieuChi = this.pcTienMatRepository.create({
      ...createPhieuChiDto,
      supplier: supplier,
      purchasingOfficer: purchasingOfficer,
    });
    return this.dataSource.transaction(async (manager) => {
      const phieuChi = await manager.save(newPhieuChi);
      await Promise.all(
        chungtu.map(async (each) => {
          const chungTu = manager.create(ChungTuCuaPhieuChiTienMat, {
            ctmua: each.ctmua,
            money: each.money,
            content: each.content,
            phieuChiTienMat: phieuChi,
          });
          await manager.update(Ctmua, each.ctmua.id, {
            paidValue: each.ctmua.paidValue + each.money,
          });
          return manager.save(chungTu);
        }),
      );
      return phieuChi;
    });
  }

  findAllPhieuChiTienMat() {
    return this.pcTienMatRepository.find({
      relations: {
        supplier: true,
        purchasingOfficer: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  findOnePhieuChiTienMat(id: number) {
    return this.pcTienMatRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        supplier: true,
        purchasingOfficer: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  findByDatePhieuChiTienMat(startDate: Date, endDate: Date) {
    return this.pcTienMatRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
      },
      relations: {
        supplier: true,
        purchasingOfficer: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  updatePhieuChiTienMat(
    id: number,
    updatePhieuChiDto: UpdatePhieuChiTienMatDto,
  ) {
    return this.pcTienMatRepository.update(id, updatePhieuChiDto);
  }

  removePhieuChiTienMat(id: number) {
    return this.pcTienMatRepository.delete;
  }

  // Tien gui

  createPhieuChiTienGui(
    createPhieuChiDto: CreatePhieuChiTienGuiDto,
    supplier: Supplier,
    purchasingOfficer: PurchasingOfficer,
    bankAccount: BankAccount,
    chungtu: { ctmua: Ctmua; money: number; content: string }[],
  ) {
    const newPhieuChi = this.pcTienGuiRepository.create({
      ...createPhieuChiDto,
      supplier: supplier,
      purchasingOfficer: purchasingOfficer,
      bankAccount: bankAccount,
    });
    return this.dataSource.transaction(async (manager) => {
      const phieuChi = await manager.save(newPhieuChi);
      await Promise.all(
        chungtu.map(async (each) => {
          const chungTu = manager.create(ChungTuCuaPhieuChiTienGui, {
            ctmua: each.ctmua,
            money: each.money,
            content: each.content,
            phieuChiTienGui: phieuChi,
          });
          await manager.update(Ctmua, each.ctmua.id, {
            paidValue: each.ctmua.paidValue + each.money,
          });
          return manager.save(chungTu);
        }),
      );
      return phieuChi;
    });
  }

  findAllPhieuChiTienGui() {
    return this.pcTienGuiRepository.find({
      relations: {
        supplier: true,
        purchasingOfficer: true,
        bankAccount: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  findOnePhieuChiTienGui(id: number) {
    return this.pcTienGuiRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        supplier: true,
        purchasingOfficer: true,
        bankAccount: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  findByDatePhieuChiTienGui(startDate: Date, endDate: Date) {
    return this.pcTienGuiRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
      },
      relations: {
        supplier: true,
        purchasingOfficer: true,
        bankAccount: true,
        chungTu: {
          ctmua: true,
        },
      },
    });
  }

  updatePhieuChiTienGui(
    id: number,
    updatePhieuChiDto: UpdatePhieuChiTienGuiDto,
  ) {
    return this.pcTienGuiRepository.update(id, updatePhieuChiDto);
  }

  removePhieuChiTienGui(id: number) {
    return this.pcTienGuiRepository.delete(id);
  }

  // Khac

  createPhieuChiKhac(
    createPhieuChiKhacDto: CreatePhieuChiKhacDto,
    account: Accountant,
    BankAccount: BankAccount | undefined,
  ) {
    const newPhieuChi = this.pcKhacRepository.create({
      ...createPhieuChiKhacDto,
      accountant: account,
      bankAccount: BankAccount,
    });
    return this.pcKhacRepository.save(newPhieuChi);
  }

  findAllPhieuChiKhac() {
    return this.pcKhacRepository.find({
      relations: {
        accountant: true,
        bankAccount: true,
      },
    });
  }

  findByDatePhieuChiKhac(startDate: Date, endDate: Date) {
    return this.pcKhacRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
      },
      relations: {
        accountant: true,
        bankAccount: true,
      },
    });
  }

  findOnePhieuChiKhac(id: number) {
    return this.pcKhacRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        accountant: true,
        bankAccount: true,
      },
    });
  }

  updatePhieuChiKhac(id: number, updatePhieuChiDto: UpdatePhieuChiKhacDto) {
    return this.pcKhacRepository.update(id, updatePhieuChiDto);
  }

  removePhieuChiKhac(id: number) {
    return this.pcKhacRepository.delete(id);
  }
}
