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
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Auth(USER_ROLE.ADMIN)
  @Post('user')
  createAccountant(@Body() createAccountantDto: CreateAccountantDto) {
    return this.employeeService.createAccountant(createAccountantDto);
  }

  @Auth(USER_ROLE.ADMIN)
  @Post('other')
  createOther(@Body() createOtherEmployeeDto: CreateOtherEmployee) {
    return this.employeeService.createOtherEmployee(createOtherEmployeeDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('warehouse-keeper')
  findAllWarehouseKeeper() {
    return this.employeeService.findAllWareHouseKeeper();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('purchasing-officer')
  findAllPurchasingOfficer() {
    return this.employeeService.findAllPurchasingOfficer();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('salesperson')
  findAllSalesperson() {
    return this.employeeService.findAllSalesperson();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('accountant')
  findAllAccountant() {
    return this.employeeService.findAllAccountant();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('warehouse-keeper/:id')
  findOneWarehouseKeeper(@Param('id') id: string) {
    return this.employeeService.findOneWarehouseKeeper(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('purchasing-officer/:id')
  findOnePurchasingOfficer(@Param('id') id: string) {
    return this.employeeService.findOnePurchasingOfficer(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('salesperson/:id')
  findOneSalesperson(@Param('id') id: string) {
    return this.employeeService.findOneSalesperson(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('accountant/:id')
  findOneAccountant(@Param('id') id: string) {
    return this.employeeService.findOneAccountant(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('salesperson/:id')
  removeSalesperson(@Param('id') id: string) {
    return this.employeeService.removeSalesperson(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('warehouse-keeper/:id')
  removeWarehouseKeeper(@Param('id') id: string) {
    return this.employeeService.removeWarehouseKeeper(+id);
  }

  @Auth(USER_ROLE.ADMIN)
  @Delete('purchasing-officer/:id')
  removePurchasingOfficer(@Param('id') id: string) {
    return this.employeeService.removePurchasingOfficer(+id);
  }
}
