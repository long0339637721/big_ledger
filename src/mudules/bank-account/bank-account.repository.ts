import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BankAccount, Transaction } from './entities/bank-account.entity';
import {
  CreateBankAccountDto,
  CreateTransactionDto,
} from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PhieuThuTienGui } from '../phieu-thu/entities/phieu-thu.entity';
import {
  PhieuChiKhac,
  PhieuChiTienGui,
} from '../phieu-chi/entities/phieu-chi.entity';

@Injectable()
export class BankAccountRepository {
  private readonly bankAccountRepository: Repository<BankAccount>;
  private readonly transactionRepository: Repository<Transaction>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.bankAccountRepository = this.dataSource.getRepository(BankAccount);
    this.transactionRepository = this.dataSource.getRepository(Transaction);
  }
  create(createBankAccountDto: CreateBankAccountDto) {
    const newBankAccount = this.bankAccountRepository.create({
      ...createBankAccountDto,
    });
    return this.bankAccountRepository.save(newBankAccount);
  }

  findAll() {
    return this.bankAccountRepository.find();
  }

  findOne(id: number) {
    return this.bankAccountRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountRepository.update(id, updateBankAccountDto);
  }

  remove(id: number) {
    return this.bankAccountRepository.delete(id);
  }

  // Transaction

  createTransaction(
    createTransactionDto: CreateTransactionDto,
    bankAccount: BankAccount,
  ) {
    const newTransaction = this.transactionRepository.create({
      ...createTransactionDto,
      bankAccount: bankAccount,
    });
    return this.transactionRepository.save(newTransaction);
  }

  findAllTransaction() {
    return this.transactionRepository.find();
  }

  findTransactionByBank(bankAccount: BankAccount) {
    return this.transactionRepository.find({
      where: {
        bankAccount: {
          id: bankAccount.id,
        },
      },
    });
  }

  findTransactionByBankReconciled(bankAccount: BankAccount) {
    return this.transactionRepository.find({
      where: {
        bankAccount: bankAccount,
        reconciled: false,
      },
    });
  }

  findOneTransaction(id: number) {
    return this.transactionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        bankAccount: true,
        phieuThu: true,
        phieuChi: true,
        phieuChiKhac: true,
      },
    });
  }

  findTransactionByTransactionNumber(transactionNumber: string) {
    return this.transactionRepository.findOne({
      where: {
        transactionNumber: transactionNumber,
      },
    });
  }

  reconcilePhieuThu(transaction: Transaction, phieuThu: PhieuThuTienGui) {
    transaction.phieuThu = phieuThu;
    transaction.reconciled = true;
    return this.transactionRepository.save(transaction);
  }

  reconcilePhieuChi(transaction: Transaction, phieuChi: PhieuChiTienGui) {
    transaction.phieuChi = phieuChi;
    transaction.reconciled = true;
    return this.transactionRepository.save(transaction);
  }

  reconcilePhieuChiKhac(transaction: Transaction, phieuChiKhac: PhieuChiKhac) {
    transaction.phieuChiKhac = phieuChiKhac;
    transaction.reconciled = true;
    return this.transactionRepository.save(transaction);
  }
}
