import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import {
  Accountant,
  PurchasingOfficer,
  Salesperson,
  Admin,
  WarehouseKeeper,
} from './entities/employee.entity';
import {
  CreateAdminDto,
  CreateAccountantDto,
  CreatePurchasingOfficerDto,
  CreateSalespersonDto,
  CreateWarehouseKeeperDto,
} from './dto/create-employee.dto';
import { DEFAULT_VALUES } from 'src/constants';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeRepository {
  private readonly pOfficerRepository: Repository<PurchasingOfficer>;
  private readonly accountantRepository: Repository<Accountant>;
  private readonly salespersonRepository: Repository<Salesperson>;
  private readonly adminRepository: Repository<Admin>;
  private readonly wKeeperRepository: Repository<WarehouseKeeper>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.pOfficerRepository = this.dataSource.getRepository(PurchasingOfficer);
    this.accountantRepository = this.dataSource.getRepository(Accountant);
    this.salespersonRepository = this.dataSource.getRepository(Salesperson);
    this.adminRepository = this.dataSource.getRepository(Admin);
    this.wKeeperRepository = this.dataSource.getRepository(WarehouseKeeper);
  }

  createAccountant(createAccountantDto: CreateAccountantDto, password: string) {
    const newAccountant = this.accountantRepository.create({
      name: createAccountantDto.name,
      email: createAccountantDto.email,
      phone: createAccountantDto.phone,
      address: createAccountantDto.address,
      password: password,
      avatar: createAccountantDto.avatar ?? DEFAULT_VALUES.DEFAULT_AVATAR,
      isAdmin: createAccountantDto.isAdmin,
      isDeleted: false,
      companyName: createAccountantDto.companyName,
      companyAddress: createAccountantDto.companyAddress,
      companyPhone: createAccountantDto.companyPhone,
      companyEmail: createAccountantDto.companyEmail,
      companyLogo: createAccountantDto.companyLogo,
      companyTaxCode: createAccountantDto.companyTaxCode,
      companyRepresentative: createAccountantDto.companyRepresentative,
      firstAnnounce: createAccountantDto.firstAnnounce,
      secondAnnounce: createAccountantDto.secondAnnounce,
    });
    return this.accountantRepository.save(newAccountant);
  }

  createSalesperson(createSalespersonDto: CreateSalespersonDto) {
    return this.salespersonRepository.save(createSalespersonDto);
  }

  createPurchasingOfficer(
    createPurchasingOfficerDto: CreatePurchasingOfficerDto,
  ) {
    return this.pOfficerRepository.save(createPurchasingOfficerDto);
  }

  createWarehouseKeeper(createWarehouseKeeperDto: CreateWarehouseKeeperDto) {
    return this.wKeeperRepository.save(createWarehouseKeeperDto);
  }

  findAllWarehouseKeeper() {
    return this.wKeeperRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findAllPurchasingOfficer() {
    return this.pOfficerRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findAllSalesperson() {
    return this.salespersonRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  findSalespersonByIds(ids: number[]) {
    return this.salespersonRepository.find({
      where: {
        id: In(ids),
        isDeleted: false,
      },
    });
  }

  findAllAccountant() {
    return this.accountantRepository.find({
      where: {
        isDeleted: false,
        isAdmin: false,
      },
    });
  }

  findOneWarehouseKeeper(id: number) {
    return this.wKeeperRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
  }

  findOnePurchasingOfficer(id: number) {
    return this.pOfficerRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
  }

  findOneSalesperson(id: number) {
    return this.salespersonRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
  }

  findOneAccountant(id: number) {
    return this.accountantRepository.findOneBy({
      id: id,
      isDeleted: false,
      isAdmin: false,
    });
  }

  findAmin() {
    return this.accountantRepository.findOneBy({
      isAdmin: true,
      isDeleted: false,
    });
  }

  findOneByEmail(email: string) {
    return this.accountantRepository.findOneBy({
      email: email,
      isDeleted: false,
    });
  }

  findOneAdminOrAccountant(id: number) {
    return this.accountantRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
  }

  update(id: number, updateDto: UpdateEmployeeDto) {
    return this.accountantRepository.update(id, updateDto);
  }

  updatePassword(id: number, password: string) {
    return this.accountantRepository.update(id, {
      password: password,
    });
  }

  remove(id: number) {
    return this.accountantRepository.update(id, {
      isDeleted: true,
    });
  }
}
