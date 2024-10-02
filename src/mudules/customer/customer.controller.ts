import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  CreateCustomerGroupDto,
} from './dto/create-customer.dto';
import {
  UpdateCustomerDto,
  UpdateCustomerGroupDto,
} from './dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('phone/:phone')
  findOneByPhone(@Param('phone') phone: string) {
    return this.customerService.findOneByPhone(phone);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.customerService.findOneByEmail(email);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}

@ApiTags('Doi tuong')
@Controller('customer-group')
export class CustomerGroupController {
  constructor(private readonly customerService: CustomerService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.customerService.createGroup(createCustomerGroupDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.customerService.findAllGroup();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOneGroup(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerGroupDto: UpdateCustomerGroupDto,
  ) {
    return this.customerService.updateGroup(+id, updateCustomerGroupDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.removeGroup(+id);
  // }
}
