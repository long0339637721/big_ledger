import { forwardRef, Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import {
  BankAccountController,
  TransactionController,
} from './bank-account.controller';
import { BankAccountRepository } from './bank-account.repository';
import { PhieuThuModule } from '../phieu-thu/phieu-thu.module';
import { PhieuChiModule } from '../phieu-chi/phieu-chi.module';

@Module({
  controllers: [BankAccountController, TransactionController],
  providers: [BankAccountService, BankAccountRepository],
  exports: [BankAccountService],
  imports: [forwardRef(() => PhieuThuModule), forwardRef(() => PhieuChiModule)],
})
export class BankAccountModule {}
