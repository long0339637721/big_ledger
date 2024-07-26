import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';

import { AuthModule } from './mudules/auth/auth.module';
// import { UserModule } from './mudules/user/user.module';
// import { LocationModule } from './mudules/location/location.module';
// import { CommentModule } from './mudules/comment/comment.module';
// import { UserEntity } from './mudules/user/entities/user.entity';
// import { LocationEntity } from './mudules/location/entities/location.entity';
// import { CommentEntity } from './mudules/comment/entities/comment.entity';

import { Announcement } from './mudules/announcement/entities/announcement.entity';
import { AnnouncementModule } from './mudules/announcement/announcement.module';
import { BankAccount } from './mudules/bank-account/entities/bank-account.entity';
import { BankAccountModule } from './mudules/bank-account/bank-account.module';
import { Cktm } from './mudules/cktm/entities/cktm.entity';
import { CktmModule } from './mudules/cktm/cktm.module';
import { Ctban, ProductOfCtban } from './mudules/ctban/entities/ctban.entity';
import { CtbanModule } from './mudules/ctban/ctban.module';
import { Ctmua, ProductOfCtmua } from './mudules/ctmua/entities/ctmua.entity';
import { CtmuaModule } from './mudules/ctmua/ctmua.module';
import {
  Customer,
  CustomerGroup,
} from './mudules/customer/entities/customer.entity';
import { CustomerModule } from './mudules/customer/customer.module';
import { DieuKhoan } from './mudules/dieu-khoan/entities/dieu-khoan.entity';
import { DieuKhoanModule } from './mudules/dieu-khoan/dieu-khoan.module';
import {
  DonBanHang,
  ProductOfDonBanHang,
} from './mudules/don-ban-hang/entities/don-ban-hang.entity';
import { DonBanHangModule } from './mudules/don-ban-hang/don-ban-hang.module';
import {
  DonMuaHang,
  ProductOfDonMuaHang,
} from './mudules/don-mua-hang/entities/don-mua-hang.entity';
import { DonMuaHangModule } from './mudules/don-mua-hang/don-mua-hang.module';
import {
  Accountant,
  Salesperson,
  PurchasingOfficer,
  WarehouseKeeper,
  Admin,
} from './mudules/employee/entities/employee.entity';
import { EmployeeModule } from './mudules/employee/employee.module';
import { Hdban } from './mudules/hdban/entities/hdban.entity';
import { HdbanModule } from './mudules/hdban/hdban.module';
import { Hdmua } from './mudules/hdmua/entities/hdmua.entity';
import { HdmuaModule } from './mudules/hdmua/hdmua.module';
import {
  PhieuChiTienMat,
  PhieuChiTienGui,
  ChungTuCuaPhieuChiTienMat,
  ChungTuCuaPhieuChiTienGui,
} from './mudules/phieu-chi/entities/phieu-chi.entity';
import { PhieuChiModule } from './mudules/phieu-chi/phieu-chi.module';
import {
  PhieuThuTienMat,
  PhieuThuTienGui,
  ChungTuCuaPhieuThuTienMat,
  ChungTuCuaPhieuThuTienGui,
} from './mudules/phieu-thu/entities/phieu-thu.entity';
import { PhieuThuModule } from './mudules/phieu-thu/phieu-thu.module';
import { PhieuNhap } from './mudules/phieu-nhap/entities/phieu-nhap.entity';
import { PhieuNhapModule } from './mudules/phieu-nhap/phieu-nhap.module';
import { PhieuXuat } from './mudules/phieu-xuat/entities/phieu-xuat.entity';
import { PhieuXuatModule } from './mudules/phieu-xuat/phieu-xuat.module';
import {
  Product,
  ProductGroup,
} from './mudules/product/entities/product.entity';
import { ProductModule } from './mudules/product/product.module';
import {
  ReportDccn,
  ReportDccnDetail,
  ReportDccnCustomerDetail,
} from './mudules/report-dccn/entities/report-dccn.entity';
import { ReportDccnModule } from './mudules/report-dccn/report-dccn.module';
import {
  ReportThcn,
  ReportThcnDetail,
} from './mudules/report-thcn/entities/report-thcn.entity';
import { ReportThcnModule } from './mudules/report-thcn/report-thcn.module';
import {
  ReportDtbh,
  ReportDtbhDetail,
} from './mudules/report-dtbh/entities/report-dtbh.entity';
import { ReportDtbhModule } from './mudules/report-dtbh/report-dtbh.module';
import { Supplier, SupplierGroup } from './mudules/supplier/entities';
import { SupplierModule } from './mudules/supplier/supplier.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // options: {
      //   encrypt: false,
      // },
      synchronize: true,
      entities: [
        Announcement,
        BankAccount,
        Cktm,
        Ctban,
        ProductOfCtban,
        Ctmua,
        ProductOfCtmua,
        Customer,
        CustomerGroup,
        DieuKhoan,
        DonBanHang,
        ProductOfDonBanHang,
        DonMuaHang,
        ProductOfDonMuaHang,
        Accountant,
        Salesperson,
        PurchasingOfficer,
        WarehouseKeeper,
        Admin,
        Hdban,
        Hdmua,
        PhieuChiTienMat,
        PhieuChiTienGui,
        ChungTuCuaPhieuChiTienMat,
        ChungTuCuaPhieuChiTienGui,
        PhieuThuTienMat,
        PhieuThuTienGui,
        ChungTuCuaPhieuThuTienMat,
        ChungTuCuaPhieuThuTienGui,
        PhieuNhap,
        PhieuXuat,
        Product,
        ProductGroup,
        ReportDccn,
        ReportDccnDetail,
        ReportDccnCustomerDetail,
        ReportThcn,
        ReportThcnDetail,
        ReportDtbh,
        ReportDtbhDetail,
        Supplier,
        SupplierGroup,
      ],
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: 'longdoan.student@gmail.com',
          pass: 'dhgr izdt ltlg plmq',
        },
      },
      // defaults: {
      //   from: '"nest-modules" <user@outlook.com>',
      // },
      template: {
        dir: process.cwd() + '/mail-template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    AnnouncementModule,
    BankAccountModule,
    CktmModule,
    CtbanModule,
    CtmuaModule,
    CustomerModule,
    DieuKhoanModule,
    DonBanHangModule,
    DonMuaHangModule,
    EmployeeModule,
    HdbanModule,
    HdmuaModule,
    PhieuChiModule,
    PhieuThuModule,
    PhieuNhapModule,
    PhieuXuatModule,
    ProductModule,
    ReportDccnModule,
    ReportThcnModule,
    ReportDtbhModule,
    SupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
