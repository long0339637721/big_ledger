import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateAccountantDto,
  CreateOtherEmployee,
} from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Auth(USER_ROLE.ADMIN)
  @Post('user')
  @ApiOperation({ description: 'Create new accountant/admin' })
  createAccountant(@Body() createAccountantDto: CreateAccountantDto) {
    return this.employeeService.createAccountant(createAccountantDto);
  }

  @Auth(USER_ROLE.ADMIN)
  @Post('other')
  @ApiOperation({ description: 'Create new employee' })
  createOther(@Body() createOtherEmployeeDto: CreateOtherEmployee) {
    return this.employeeService.createOtherEmployee(createOtherEmployeeDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('warehouse-keeper')
  @ApiOperation({ description: 'Get all warehouse keeper' })
  findAllWarehouseKeeper() {
    return this.employeeService.findAllWareHouseKeeper();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('purchasing-officer')
  @ApiOperation({ description: 'Get all purchasing officer' })
  findAllPurchasingOfficer() {
    return this.employeeService.findAllPurchasingOfficer();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('salesperson')
  @ApiOperation({ description: 'Get all salesperson' })
  findAllSalesperson() {
    return this.employeeService.findAllSalesperson();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('accountant')
  @ApiOperation({ description: 'Get all accountant' })
  findAllAccountant() {
    return this.employeeService.findAllAccountant();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('warehouse-keeper/:id')
  @ApiOperation({ description: 'Get warehouse keeper by id' })
  findOneWarehouseKeeper(@Param('id') id: string) {
    return this.employeeService.findOneWarehouseKeeper(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('purchasing-officer/:id')
  @ApiOperation({ description: 'Get purchasing officer by id' })
  findOnePurchasingOfficer(@Param('id') id: string) {
    return this.employeeService.findOnePurchasingOfficer(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('salesperson/:id')
  @ApiOperation({ description: 'Get salesperson by id' })
  findOneSalesperson(@Param('id') id: string) {
    return this.employeeService.findOneSalesperson(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('accountant/:id')
  @ApiOperation({ description: 'Get accountant by id' })
  findOneAccountant(@Param('id') id: string) {
    return this.employeeService.findOneAccountant(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Patch(':id')
  @ApiOperation({ description: 'Update employee by id' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete(':id')
  @ApiOperation({ description: 'Delete employee by id' })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('salesperson/:id')
  @ApiOperation({ description: 'Delete salesperson by id' })
  removeSalesperson(@Param('id') id: string) {
    return this.employeeService.removeSalesperson(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('warehouse-keeper/:id')
  @ApiOperation({ description: 'Delete warehouse keeper by id' })
  removeWarehouseKeeper(@Param('id') id: string) {
    return this.employeeService.removeWarehouseKeeper(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('purchasing-officer/:id')
  @ApiOperation({ description: 'Delete purchasing officer by id' })
  removePurchasingOfficer(@Param('id') id: string) {
    return this.employeeService.removePurchasingOfficer(+id);
  }
}
