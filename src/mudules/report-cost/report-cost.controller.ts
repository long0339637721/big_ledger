import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportCostService } from './report-cost.service';
import { CreateReportCostDto } from './dto/create-report-cost.dto';
import { UpdateReportCostDto } from './dto/update-report-cost.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('report-cost')
export class ReportCostController {
  constructor(private readonly reportCostService: ReportCostService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Tạo báo cáo kết quả kinh doanh' })
  create(@Body() createReportCostDto: CreateReportCostDto) {
    return this.reportCostService.create(createReportCostDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Tạo raw báo cáo kết quả kinh doanh' })
  createRaw(@Body() createReportCostDto: CreateReportCostDto) {
    return this.reportCostService.create(createReportCostDto, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Lấy tất cả báo cáo kết quả kinh doanh' })
  findAll() {
    return this.reportCostService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Lấy báo cáo kết quả kinh doanh theo id' })
  findOne(@Param('id') id: string) {
    return this.reportCostService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportCostDto: UpdateReportCostDto) {
  //   return this.reportCostService.update(+id, updateReportCostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportCostService.remove(+id);
  // }
}
