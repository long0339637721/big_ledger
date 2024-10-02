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
import { ApiOperation } from '@nestjs/swagger';

@Controller('ctban')
export class CtbanController {
  constructor(private readonly ctbanService: CtbanService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new chứng từ bán' })
  create(@Body() createCtbanDto: CreateCtbanDto) {
    return this.ctbanService.create(createCtbanDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all chứng từ bán' })
  findAll(@Query() query: GetCtbanDto) {
    return this.ctbanService.findAll(query);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('report-by-product')
  @ApiOperation({ description: 'Get report revenue by product' })
  reportByProduct(@Body() query: FilterByDateDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.ctbanService.findAndGroupByProduct(startDate, endDate);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-year/:year')
  @ApiOperation({ description: 'Get report revenue of year' })
  reportRevenue(@Param('year') year: string) {
    return this.ctbanService.reportRevenueOfYear(+year);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-quarter/:year/:quarter')
  @ApiOperation({ description: 'Get report revenue of quarter' })
  reportRevenueOfQuarter(
    @Param('year') year: string,
    @Param('quarter') quarter: string,
  ) {
    return this.ctbanService.reportRevenueOfQuarter(+year, +quarter);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-month/:year/:month')
  @ApiOperation({ description: 'Get report revenue of month' })
  reportRevenueOfMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.ctbanService.reportRevenueOfMonth(+year, +month);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get chứng từ bán by id' })
  findOne(@Param('id') id: string) {
    return this.ctbanService.findOne(+id);
  }

  // @Auth(USER_ROLE.ACCOUNTANT)
  // @Patch(':id')
  // @ApiOperation({ description: 'Update chứng từ bán by id' })
  // update(@Param('id') id: string, @Body() updateCtbanDto: UpdateCtbanDto) {
  //   return this.ctbanService.update(+id, updateCtbanDto);
  // }

  // @Auth(USER_ROLE.ACCOUNTANT)
  // @Delete(':id')
  // @ApiOperation({ description: 'Delete chứng từ bán by id' })
  // remove(@Param('id') id: string) {
  //   return this.ctbanService.remove(+id);
  // }
}
