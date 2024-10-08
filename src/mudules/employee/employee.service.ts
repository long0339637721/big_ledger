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
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly mailerService: MailerService,
  ) {}

  async createAccountant(createAccountantDto: CreateAccountantDto) {
    const existedEmployee = await this.employeeRepository.findOneByEmail(
      createAccountantDto.email,
    );
    if (existedEmployee) {
      throw new ConflictException('Email already exists');
    }

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

    const newEmployee = await this.employeeRepository.createAccountant(
      createAccountantDto,
      hashedPassword,
    );

    this.notifyUserRegistration(
      createAccountantDto.email,
      createAccountantDto.password,
    );

    return newEmployee;
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

  async findOneAccountantOrAdmin(id: number) {
    const employee = await this.employeeRepository.findOneAdminOrAccountant(id);
    if (!employee) {
      throw new NotFoundException(`Accountant/Admin with id ${id} not found`);
    }
    return employee;
  }

  async findAmin() {
    const admin = await this.employeeRepository.findAmin();
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
    return this.employeeRepository.remove(id);
  }

  async removeSalesperson(id: number) {
    const salesperson = await this.findOneSalesperson(id);
    return this.employeeRepository.removeSalesperson(id);
  }

  async removePurchasingOfficer(id: number) {
    const purchasingOfficer = await this.findOnePurchasingOfficer(id);
    return this.employeeRepository.removePurchasingOfficer(id);
  }

  async removeWarehouseKeeper(id: number) {
    const warehouseKeeper = await this.findOneWarehouseKeeper(id);
    return this.employeeRepository.removeWarehouseKeeper(id);
  }

  async notifyUserRegistration(to: string, password: string) {
    const subject = 'Thông báo đăng ký tài khoản thành công';
    const text = `Xin chào,
  
  Bạn đã được đăng ký tài khoản thành công. Dưới đây là thông tin đăng nhập của bạn:
  
  Email: ${to}
  Mật khẩu: ${password}
  
  Vui lòng thay đổi mật khẩu sau khi đăng nhập.
  
  Trân trọng,
  Đội ngũ hỗ trợ`;

    const html = `
    <p>Xin chào,</p>
    <p>Bạn đã được đăng ký tài khoản thành công. Dưới đây là thông tin đăng nhập của bạn:</p>
    <p>Email: <b>${to}</b></p>
    <p>Mật khẩu: <b>${password}</b></p>
    <p>Vui lòng thay đổi mật khẩu sau khi đăng nhập.</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ hỗ trợ</p>`;

    await this.mailerService
      .sendMail({
        to: to, // List of receivers email address
        from: 'longdoan.student@gmail.com', // Senders email address
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html, // '<b>welcome</b>',  HTML body content
      })
      .then((success) => {
        console.log('Send mail success');
      })
      .catch((err) => {
        console.log('Send mail fail:', err);
      });
  }
}
