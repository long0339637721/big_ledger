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

  @Post('user')
  createAccountant(@Body() createAccountantDto: CreateAccountantDto) {
    return this.employeeService.createAccountant(createAccountantDto);
  }

  @Post('other')
  createOther(@Body() createOtherEmployeeDto: CreateOtherEmployee) {
    return this.employeeService.createOtherEmployee(createOtherEmployeeDto);
  }

  // @Auth([USER_ROLE.ACCOUNTANT])
  @Get('warehouse-keeper')
  findAllWarehouseKeeper() {
    return this.employeeService.findAllWareHouseKeeper();
  }

  @Get('purchasing-officer')
  findAllPurchasingOfficer() {
    return this.employeeService.findAllPurchasingOfficer();
  }

  @Get('salesperson')
  findAllSalesperson() {
    return this.employeeService.findAllSalesperson();
  }

  // @Get('admin')
  // findAllAdmin() {
  //   return this.employeeService.findAllAdmin();
  // }

  @Get('accountant')
  findAllAccountant() {
    return this.employeeService.findAllAccountant();
  }

  @Get('warehouse-keeper/:id')
  findOneWarehouseKeeper(@Param('id') id: string) {
    return this.employeeService.findOneWarehouseKeeper(+id);
  }

  @Get('purchasing-officer/:id')
  findOnePurchasingOfficer(@Param('id') id: string) {
    return this.employeeService.findOnePurchasingOfficer(+id);
  }

  @Get('salesperson/:id')
  findOneSalesperson(@Param('id') id: string) {
    return this.employeeService.findOneSalesperson(+id);
  }

  // @Get('admin/:id')
  // findOneAdmin(@Param('id') id: string) {
  //   return this.employeeService.findOneAdmin(+id);
  // }

  @Get('accountant/:id')
  findOneAccountant(@Param('id') id: string) {
    return this.employeeService.findOneAccountant(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
