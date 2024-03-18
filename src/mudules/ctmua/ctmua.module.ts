import { Module } from '@nestjs/common';
import { CtmuaService } from './ctmua.service';
import { CtmuaController } from './ctmua.controller';
import { CtmuaRepository } from './ctmua.repository';
import { EmployeeModule } from '../employee/employee.module';
import { DonMuaHangModule } from '../don-mua-hang/don-mua-hang.module';

@Module({
  controllers: [CtmuaController],
  providers: [CtmuaService, CtmuaRepository],
  imports: [EmployeeModule, DonMuaHangModule],
})
export class CtmuaModule {}
