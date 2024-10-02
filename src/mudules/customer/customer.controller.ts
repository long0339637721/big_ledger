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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new customer' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all customer' })
  findAll() {
    return this.customerService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get customer by id' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('phone/:phone')
  @ApiOperation({ description: 'Get customer by phone' })
  findOneByPhone(@Param('phone') phone: string) {
    return this.customerService.findOneByPhone(phone);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('email/:email')
  @ApiOperation({ description: 'Get customer by email' })
  findOneByEmail(@Param('email') email: string) {
    return this.customerService.findOneByEmail(email);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update customer by id' })
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
  @ApiOperation({ description: 'Create new customer group' })
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.customerService.createGroup(createCustomerGroupDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all customer group' })
  findAll() {
    return this.customerService.findAllGroup();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get customer group by id' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOneGroup(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update customer group by id' })
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
