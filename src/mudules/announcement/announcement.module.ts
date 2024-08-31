import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementRepository } from './announcement.repository';
import { CtbanModule } from '../ctban/ctban.module';
import { DonBanHangModule } from '../don-ban-hang/don-ban-hang.module';
import { EmployeeModule } from '../employee/employee.module';
import { DonMuaHangModule } from '../don-mua-hang/don-mua-hang.module';
import { CtmuaModule } from '../ctmua/ctmua.module';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService, AnnouncementRepository],
  exports: [AnnouncementService],
  imports: [
    CtbanModule,
    DonBanHangModule,
    EmployeeModule,
    CtmuaModule,
    DonMuaHangModule,
  ],
})
export class AnnouncementModule {}
