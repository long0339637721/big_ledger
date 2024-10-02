import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportDccnService } from './report-dccn.service';
import { CreateReportDccnDto } from './dto/create-report-dccn.dto';
import { UpdateReportDccnDto } from './dto/update-report-dccn.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('report-dccn')
export class ReportDccnController {
  constructor(private readonly reportDccnService: ReportDccnService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new report dccn' })
  create(@Body() createReportDccnDto: CreateReportDccnDto) {
    return this.reportDccnService.create(createReportDccnDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Create raw report dccn' })
  findRaw(@Body() createReportDccnDto: CreateReportDccnDto) {
    return this.reportDccnService.findRaw(createReportDccnDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all report dccn' })
  findAll() {
    return this.reportDccnService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get report dccn by id' })
  findOne(@Param('id') id: string) {
    return this.reportDccnService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportDccnDto: UpdateReportDccnDto) {
  //   return this.reportDccnService.update(+id, updateReportDccnDto);
  // }

  // @Auth(USER_ROLE.ADMIN)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportDccnService.remove(+id);
  // }
}
