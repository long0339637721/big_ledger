import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonMuaHangService } from './don-mua-hang.service';
import { CreateDonMuaHangDto } from './dto/create-don-mua-hang.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@Controller('don-mua-hang')
export class DonMuaHangController {
  constructor(private readonly donMuaHangService: DonMuaHangService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createDonMuaHangDto: CreateDonMuaHangDto) {
    return this.donMuaHangService.create(createDonMuaHangDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  createRaw(@Body() createDonMuaHangDto: CreateDonMuaHangDto) {
    return this.donMuaHangService.create(createDonMuaHangDto, true);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.donMuaHangService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donMuaHangService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDonMuaHangDto: UpdateDonMuaHangDto,
  // ) {
  //   return this.donMuaHangService.update(+id, updateDonMuaHangDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.donMuaHangService.remove(+id);
  // }
}
