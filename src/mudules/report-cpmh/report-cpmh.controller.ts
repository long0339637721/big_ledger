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

@Controller('report-cpmh')
export class ReportCpmhController {
  constructor(private readonly reportCpmhService: ReportCpmhService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  createRaw(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.reportCpmhService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
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
