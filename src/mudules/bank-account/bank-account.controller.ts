import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import {
  CreateBankAccountDto,
  CreateTransactionsDto,
} from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new bank account' })
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all bank account' })
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get bank account by id' })
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update bank account by id' })
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(+id, updateBankAccountDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bankAccountService.remove(+id);
  // }
}

@ApiTags('Doi tuong')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new transaction' })
  create(@Body() createDto: CreateTransactionsDto) {
    return this.bankAccountService.createTransactions(createDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all transaction' })
  findAll() {
    return this.bankAccountService.findAllTransactions();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('bank/all/:id')
  @ApiOperation({ description: 'Get all transactions by bank account' })
  findByBankAccountAll(@Param('id') id: string) {
    return this.bankAccountService.findTransactionByBank(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('bank/reconciled/:id')
  @ApiOperation({ description: 'Get all transactions by bank account' })
  findByBankAccountReconciled(@Param('id') id: string) {
    return this.bankAccountService.findTransactionByBank(+id, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get transaction by id' })
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOneTransaction(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch('thu/:transactionId/:id')
  @ApiOperation({ description: 'reconciliation phieu thu' })
  update(
    @Param('transactionId') transactionId: string,
    @Param('id') id: string,
  ) {
    return this.bankAccountService.reconciliationPhieuThu(+transactionId, +id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch('chi/:transactionId/:id')
  @ApiOperation({ description: 'reconciliation phieu chi' })
  updatePhieuChi(
    @Param('transactionId') transactionId: string,
    @Param('id') id: string,
  ) {
    return this.bankAccountService.reconciliationPhieuChi(+transactionId, +id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch('chi-khac/:transactionId/:id')
  @ApiOperation({ description: 'reconciliation phieu chi khac' })
  updatePhieuChiKhac(
    @Param('transactionId') transactionId: string,
    @Param('id') id: string,
  ) {
    return this.bankAccountService.reconciliationPhieuChiKhac(
      +transactionId,
      +id,
    );
  }
}
