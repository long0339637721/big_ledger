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

@Controller('don-ban-hang')
export class DonBanHangController {
  constructor(private readonly donBanHangService: DonBanHangService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createDonBanHangDto: CreateDonBanHangDto) {
    return this.donBanHangService.create(createDonBanHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  createRaw(@Body() createDonBanHangDto: CreateDonBanHangDto) {
    return this.donBanHangService.createRaw(createDonBanHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll(@Query() query: GetDonBanHangDto) {
    return this.donBanHangService.findAll(query);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donBanHangService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonBanHangDto: UpdateDonBanHangDto,
  ) {
    return this.donBanHangService.update(+id, updateDonBanHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donBanHangService.remove(+id);
  }
}
