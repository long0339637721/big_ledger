import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportCpmhService } from './report-cpmh.service';
import { CreateReportCpmhDto } from './dto/create-report-cpmh.dto';
import { UpdateReportCpmhDto } from './dto/update-report-cpmh.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('report-cpmh')
export class ReportCpmhController {
  constructor(private readonly reportCpmhService: ReportCpmhService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Tạo báo cáo chi phí mua hàng' })
  create(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Tạo raw báo cáo chi phí mua hàng' })
  createRaw(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Lấy tất cả báo cáo chi phí mua hàng' })
  findAll() {
    return this.reportCpmhService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Lấy báo cáo chi phí mua hàng theo id' })
  findOne(@Param('id') id: string) {
    return this.reportCpmhService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportCpmhDto: UpdateReportCpmhDto) {
  //   return this.reportCpmhService.update(+id, updateReportCpmhDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportCpmhService.remove(+id);
  // }
}
