import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportNoPhaiTraService } from './report-no-phai-tra.service';
import { CreateReportNoPhaiTraDto } from './dto/create-report-no-phai-tra.dto';
import { UpdateReportNoPhaiTraDto } from './dto/update-report-no-phai-tra.dto';

@Controller('report-no-phai-tra')
export class ReportNoPhaiTraController {
  constructor(
    private readonly reportNoPhaiTraService: ReportNoPhaiTraService,
  ) {}

  @Post()
  create(@Body() createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    return this.reportNoPhaiTraService.create(createReportNoPhaiTraDto);
  }

  @Post('raw')
  createRaw(@Body() createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    return this.reportNoPhaiTraService.create(createReportNoPhaiTraDto, true);
  }

  @Get()
  findAll() {
    return this.reportNoPhaiTraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportNoPhaiTraService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportNoPhaiTraDto: UpdateReportNoPhaiTraDto) {
  //   return this.reportNoPhaiTraService.update(+id, updateReportNoPhaiTraDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportNoPhaiTraService.remove(+id);
  // }
}
