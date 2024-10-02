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
import { DonBanHangService } from './don-ban-hang.service';
import { CreateDonBanHangDto } from './dto/create-don-ban-hang.dto';
import { UpdateDonBanHangDto } from './dto/update-don-ban-hang.dto';
import { GetDonBanHangDto } from './dto/get-don-ban-hang.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('don-ban-hang')
export class DonBanHangController {
  constructor(private readonly donBanHangService: DonBanHangService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new đơn bán hàng' })
  create(@Body() createDonBanHangDto: CreateDonBanHangDto) {
    return this.donBanHangService.create(createDonBanHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  @ApiOperation({ description: 'Create raw đơn bán hàng' })
  createRaw(@Body() createDonBanHangDto: CreateDonBanHangDto) {
    return this.donBanHangService.createRaw(createDonBanHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all đơn bán hàng' })
  findAll(@Query() query: GetDonBanHangDto) {
    return this.donBanHangService.findAll(query);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get đơn bán hàng by id' })
  findOne(@Param('id') id: string) {
    return this.donBanHangService.findOne(+id);
  }

  // @Auth(USER_ROLE.ACCOUNTANT)
  // @Patch(':id')
  // @ApiOperation({ description: 'Update đơn bán hàng by id' })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDonBanHangDto: UpdateDonBanHangDto,
  // ) {
  //   return this.donBanHangService.update(+id, updateDonBanHangDto);
  // }

  // @Auth(USER_ROLE.ACCOUNTANT)
  // @Delete(':id')
  // @ApiOperation({ description: 'Delete đơn bán hàng by id' })
  // remove(@Param('id') id: string) {
  //   return this.donBanHangService.remove(+id);
  // }
}
