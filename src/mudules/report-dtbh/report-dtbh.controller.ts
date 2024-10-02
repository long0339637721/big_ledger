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
import { ApiOperation } from '@nestjs/swagger';

@Controller('report-dtbh')
export class ReportDtbhController {
  constructor(private readonly reportDtbhService: ReportDtbhService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new report dtbh' })
  create(@Body() createReportDtbhDto: CreateReportDtbhDto) {
    return this.reportDtbhService.create(createReportDtbhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Create raw report dtbh' })
  createRaw(@Body() createReportDtbhDto: CreateReportDtbhDto) {
    return this.reportDtbhService.createRaw(createReportDtbhDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all report dtbh' })
  findAll() {
    return this.reportDtbhService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get report dtbh by id' })
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
