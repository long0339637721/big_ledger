import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateBankAccountDto,
  CreateTransactionsDto,
} from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountRepository } from './bank-account.repository';
import { PhieuChiService } from '../phieu-chi/phieu-chi.service';
import { PhieuThuService } from '../phieu-thu/phieu-thu.service';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    @Inject(forwardRef(() => PhieuChiService))
    private readonly phieuChiService: PhieuChiService,
    @Inject(forwardRef(() => PhieuThuService))
    private readonly phieuThuService: PhieuThuService,
  ) {}

  create(createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepository.create(createBankAccountDto);
  }

  findAll() {
    return this.bankAccountRepository.findAll();
  }

  async findOne(id: number) {
    const bankAccount = await this.bankAccountRepository.findOne(id);
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
    return bankAccount;
  }

  async update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    await this.findOne(id);
    return this.bankAccountRepository.update(id, updateBankAccountDto);
  }

  remove(id: number) {
    return this.bankAccountRepository.remove(id);
  }

  // Transaction

  async createTransactions(createTransactionsDto: CreateTransactionsDto) {
    createTransactionsDto.transactions.forEach((transaction) => {
      if (transaction.debit * transaction.credit !== 0) {
        return new ConflictException('One of debit or credit must be 0');
      }
    });

    createTransactionsDto.transactions.forEach(async (transaction) => {
      const bankAccount = await this.findOne(transaction.bankAccountId);
      const trans =
        await this.bankAccountRepository.findTransactionByTransactionNumber(
          transaction.transactionNumber,
        );
      if (trans) {
        return new ConflictException('Transaction number already exists');
      }
      this.bankAccountRepository.createTransaction(transaction, bankAccount);
    });
  }

  findAllTransactions() {
    return this.bankAccountRepository.findAllTransaction();
  }

  async findOneTransaction(transactionId: number) {
    const trans =
      await this.bankAccountRepository.findOneTransaction(transactionId);
    if (!trans) {
      throw new NotFoundException('Transaction not found');
    }
    return trans;
  }

  async findTransactionByBank(
    bankAccountId: number,
    reconciled: boolean = true,
  ) {
    const bankAccount = await this.findOne(bankAccountId);
    if (!reconciled) {
      return this.bankAccountRepository.findTransactionByBankReconciled(
        bankAccount,
      );
    }
    return this.bankAccountRepository.findTransactionByBank(bankAccount);
  }

  async reconciliationPhieuChi(transactionId: number, phieuChiId: number) {
    const phieuChi = await this.phieuChiService.findOneTienGui(phieuChiId);
    const transaction = await this.findOneTransaction(transactionId);
    if (transaction.reconciled) {
      return new ConflictException('Transaction already reconciled');
    }
    // if (
    //   transaction.debit - transaction.transactionFee !==
    //   phieuChi.chungTu.reduce((a, b) => a + b.money, 0)
    // ) {
    //   return new ConflictException('Credit amount not match');
    // }
    const res = this.bankAccountRepository.reconcilePhieuChi(
      transaction,
      phieuChi,
    );
    await this.phieuChiService.reconcileTienGui(phieuChiId);
    return res;
  }

  async reconciliationPhieuThu(transactionId: number, phieuThuId: number) {
    const phieuThu = await this.phieuThuService.findOneTienGui(phieuThuId);
    const transaction = await this.findOneTransaction(transactionId);
    if (transaction.reconciled) {
      return new ConflictException('Transaction already reconciled');
    }
    // if (
    //   transaction.credit - transaction.transactionFee !==
    //   phieuThu.chungTuCuaPhieuThu.reduce((a, b) => a + b.money, 0)
    // ) {
    //   return new ConflictException('Debit amount not match');
    // }
    return this.bankAccountRepository.reconcilePhieuThu(transaction, phieuThu);
  }

  async reconciliationPhieuChiKhac(transactionId: number, phieuChiId: number) {
    const phieuChi = await this.phieuChiService.findOneKhac(phieuChiId);
    const transaction = await this.findOneTransaction(transactionId);
    if (transaction.reconciled) {
      return new ConflictException('Transaction already reconciled');
    }
    // if (transaction.debit - transaction.transactionFee !== phieuChi.money) {
    //   return new ConflictException('Credit amount not match');
    // }
    const res = await this.bankAccountRepository.reconcilePhieuChiKhac(
      transaction,
      phieuChi,
    );
    await this.phieuChiService.reconcileKhac(phieuChiId);
    return res;
  }
}
