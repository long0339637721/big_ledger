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
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
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
