import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CreateAccountantDto,
  CreateOtherEmployee,
} from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { generateHash } from 'src/common/utils';
import { USER_ROLE } from 'src/constants';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  createAccountant(createAccountantDto: CreateAccountantDto) {
    if (createAccountantDto.isAdmin) {
      const requiredAttributes = [
        'companyName',
        'companyAddress',
        'companyPhone',
        'companyEmail',
        'companyLogo',
        'companyTaxCode',
        'companyRepresentative',
        'firstAnnounce',
        'secondAnnounce',
      ];
      for (const attribute of requiredAttributes) {
        if (!(attribute in createAccountantDto)) {
          throw new UnprocessableEntityException(
            `Missing attribute: ${attribute}`,
          );
        }
      }
    } else {
      createAccountantDto.companyName = undefined;
      createAccountantDto.companyAddress = undefined;
      createAccountantDto.companyPhone = undefined;
      createAccountantDto.companyEmail = undefined;
      createAccountantDto.companyLogo = undefined;
      createAccountantDto.companyTaxCode = undefined;
      createAccountantDto.companyRepresentative = undefined;
      createAccountantDto.firstAnnounce = undefined;
      createAccountantDto.secondAnnounce = undefined;
    }
    const hashedPassword = generateHash(createAccountantDto.password);

    return this.employeeRepository.createAccountant(
      createAccountantDto,
      hashedPassword,
    );
  }

  createOtherEmployee(createOtherEmployee: CreateOtherEmployee) {
    switch (createOtherEmployee.role) {
      case USER_ROLE.PURCHARSING_OFFICER:
        return this.employeeRepository.createPurchasingOfficer(
          createOtherEmployee,
        );
      case USER_ROLE.SALESPERSON:
        return this.employeeRepository.createSalesperson(createOtherEmployee);
      case USER_ROLE.WAREHOUSE_KEEPER:
        return this.employeeRepository.createWarehouseKeeper(
          createOtherEmployee,
        );
      default:
        throw new NotFoundException(
          `Role ${createOtherEmployee.role} not found`,
        );
    }
  }

  findAllWareHouseKeeper() {
    return this.employeeRepository.findAllWarehouseKeeper();
  }

  findAllPurchasingOfficer() {
    return this.employeeRepository.findAllPurchasingOfficer();
  }

  findAllSalesperson() {
    return this.employeeRepository.findAllSalesperson();
  }

  async findSalespersonByIds(ids: number[]) {
    if (ids.length === 0) {
      return this.findAllSalesperson();
    }
    const salespersons =
      await this.employeeRepository.findSalespersonByIds(ids);
    if (salespersons.length !== ids.length) {
      throw new NotFoundException('Some salesperson not found');
    }
    return salespersons;
  }

  findAllAccountant() {
    return this.employeeRepository.findAllAccountant();
  }

  async findOneWarehouseKeeper(id: number) {
    const warehouseKeeper =
      await this.employeeRepository.findOneWarehouseKeeper(id);
    if (!warehouseKeeper) {
      throw new NotFoundException(`Warehouse keeper with id ${id} not found`);
    }
    return warehouseKeeper;
  }

  async findOnePurchasingOfficer(id: number) {
    const purchasingOfficer =
      await this.employeeRepository.findOnePurchasingOfficer(id);
    if (!purchasingOfficer) {
      throw new NotFoundException(`Purchasing officer with id ${id} not found`);
    }
    return purchasingOfficer;
  }

  async findOneSalesperson(id: number) {
    const salesperson = await this.employeeRepository.findOneSalesperson(id);
    if (!salesperson) {
      throw new NotFoundException(`Salesperson with id ${id} not found`);
    }
    return salesperson;
  }

  async findOneAccountant(id: number) {
    const accountant = await this.employeeRepository.findOneAccountant(id);
    if (!accountant) {
      throw new NotFoundException(`Accountant with id ${id} not found`);
    }
    return accountant;
  }

  async findAmin() {
    const admin = this.employeeRepository.findAmin();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async findOneByEmail(email: string) {
    const employee = await this.employeeRepository.findOneByEmail(email);
    if (!employee) {
      throw new NotFoundException(`Employee with email ${email} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.findOneAdminOrAccountant(id);
    await this.employeeRepository.update(id, updateEmployeeDto);
    if (updateEmployeeDto.password) {
      const newPass = generateHash(updateEmployeeDto.password);
      return this.employeeRepository.updatePassword(id, newPass);
    }
  }

  async remove(id: number) {
    const employee = await this.findOneAccountant(id);
    if (employee.isAdmin) {
      throw new ConflictException('Cannot delete admin');
    }
    return this.employeeRepository.remove(id);
  }
}
