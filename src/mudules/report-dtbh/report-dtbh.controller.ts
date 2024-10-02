import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportDtbhService } from './report-dtbh.service';
import { CreateReportDtbhDto } from './dto/create-report-dtbh.dto';
import { UpdateReportDtbhDto } from './dto/update-report-dtbh.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@Controller('report-dtbh')
export class ReportDtbhController {
  constructor(private readonly reportDtbhService: ReportDtbhService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createReportDtbhDto: CreateReportDtbhDto) {
    return this.reportDtbhService.create(createReportDtbhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  createRaw(@Body() createReportDtbhDto: CreateReportDtbhDto) {
    return this.reportDtbhService.createRaw(createReportDtbhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.reportDtbhService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportDtbhService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportDtbhDto: UpdateReportDtbhDto) {
  //   return this.reportDtbhService.update(+id, updateReportDtbhDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportDtbhService.remove(+id);
  // }
}
