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
import { CtmuaService } from './ctmua.service';
import { CreateCtmuaDto } from './dto/create-ctmua.dto';
import { UpdateCtmuaDto } from './dto/update-ctmua.dto';
import { GetCtmuaDto } from './dto/get-ctmua.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ctmua')
export class CtmuaController {
  constructor(private readonly ctmuaService: CtmuaService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new chứng từ mua' })
  create(@Body() createCtmuaDto: CreateCtmuaDto) {
    return this.ctmuaService.create(createCtmuaDto);
  }

  // @Post('report-by-product')
  // reportByProduct(@Body() query: FilterByDateDto) {
  //   const startDate = new Date(query.startDate);
  //   const endDate = new Date(query.endDate);
  //   return this.ctmuaService.findAndGroupByProduct(startDate, endDate);
  // }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all chứng từ mua' })
  findAll() {
    return this.ctmuaService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('by-date')
  findByDate(@Query() query: GetCtmuaDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.ctmuaService.findByDate(
      startDate,
      endDate,
      query.paymentStatus,
    );
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-year/:year')
  @ApiOperation({ description: 'Get report revenue of year' })
  reportRevenue(@Param('year') year: string) {
    return this.ctmuaService.reportCostOfYear(+year);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-quarter/:year/:quarter')
  @ApiOperation({ description: 'Get report revenue of quarter' })
  reportRevenueOfQuarter(
    @Param('year') year: string,
    @Param('quarter') quarter: string,
  ) {
    return this.ctmuaService.reportCostOfQuarter(+year, +quarter);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('report-revenue-of-month/:year/:month')
  @ApiOperation({ description: 'Get report revenue of month' })
  reportRevenueOfMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.ctmuaService.reportCostOfMonth(+year, +month);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get chứng từ mua by id' })
  findOne(@Param('id') id: string) {
    return this.ctmuaService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCtmuaDto: UpdateCtmuaDto) {
  //   return this.ctmuaService.update(+id, updateCtmuaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ctmuaService.remove(+id);
  // }
}
