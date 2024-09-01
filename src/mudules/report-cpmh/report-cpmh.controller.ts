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

@Controller('report-cpmh')
export class ReportCpmhController {
  constructor(private readonly reportCpmhService: ReportCpmhService) {}

  @Post()
  create(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto);
  }

  @Post('raw')
  createRaw(@Body() createReportCpmhDto: CreateReportCpmhDto) {
    return this.reportCpmhService.create(createReportCpmhDto, true);
  }

  @Get()
  findAll() {
    return this.reportCpmhService.findAll();
  }

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
