import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CtbanService } from './ctban.service';
import { CreateCtbanDto } from './dto/create-ctban.dto';
import { UpdateCtbanDto } from './dto/update-ctban.dto';
import { GetCtbanDto } from './dto/get-ctban.dto';
import { FilterByDateDto } from 'src/common/dto/filter-by-date.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@Controller('ctban')
export class CtbanController {
  constructor(private readonly ctbanService: CtbanService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createCtbanDto: CreateCtbanDto) {
    return this.ctbanService.create(createCtbanDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll(@Query() query: GetCtbanDto) {
    return this.ctbanService.findAll(query);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('report-by-product')
  reportByProduct(@Body() query: FilterByDateDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.ctbanService.findAndGroupByProduct(startDate, endDate);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-year/:year')
  reportRevenue(@Param('year') year: string) {
    return this.ctbanService.reportRevenueOfYear(+year);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-quarter/:year/:quarter')
  reportRevenueOfQuarter(
    @Param('year') year: string,
    @Param('quarter') quarter: string,
  ) {
    return this.ctbanService.reportRevenueOfQuarter(+year, +quarter);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-month/:year/:month')
  reportRevenueOfMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.ctbanService.reportRevenueOfMonth(+year, +month);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctbanService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCtbanDto: UpdateCtbanDto) {
    return this.ctbanService.update(+id, updateCtbanDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ctbanService.remove(+id);
  }
}
