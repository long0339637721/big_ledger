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

@Controller('report-cost')
export class ReportCostController {
  constructor(private readonly reportCostService: ReportCostService) {}

  @Post()
  create(@Body() createReportCostDto: CreateReportCostDto) {
    return this.reportCostService.create(createReportCostDto);
  }

  @Post('raw')
  createRaw(@Body() createReportCostDto: CreateReportCostDto) {
    return this.reportCostService.create(createReportCostDto, true);
  }

  @Get()
  findAll() {
    return this.reportCostService.findAll();
  }

  @Get(':id')
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
