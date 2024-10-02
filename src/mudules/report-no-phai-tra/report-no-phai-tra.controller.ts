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
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('report-no-phai-tra')
export class ReportNoPhaiTraController {
  constructor(
    private readonly reportNoPhaiTraService: ReportNoPhaiTraService,
  ) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new report no phai tra' })
  create(@Body() createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    return this.reportNoPhaiTraService.create(createReportNoPhaiTraDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Create raw report no phai tra' })
  createRaw(@Body() createReportNoPhaiTraDto: CreateReportNoPhaiTraDto) {
    return this.reportNoPhaiTraService.create(createReportNoPhaiTraDto, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all report no phai tra' })
  findAll() {
    return this.reportNoPhaiTraService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get report no phai tra by id' })
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
