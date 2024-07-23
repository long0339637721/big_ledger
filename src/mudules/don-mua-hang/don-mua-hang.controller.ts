import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonMuaHangService } from './don-mua-hang.service';
import { CreateDonMuaHangDto } from './dto/create-don-mua-hang.dto';

@Controller('don-mua-hang')
export class DonMuaHangController {
  constructor(private readonly donMuaHangService: DonMuaHangService) {}

  @Post()
  create(@Body() createDonMuaHangDto: CreateDonMuaHangDto) {
    return this.donMuaHangService.create(createDonMuaHangDto);
  }

  // @Post('raw')
  // createRaw(@Body() createDonMuaHangDto: CreateDonMuaHangDto) {
  //   return this.donMuaHangService.createRaw(createDonMuaHangDto);
  // }

  @Get()
  findAll() {
    return this.donMuaHangService.findAll();
  }

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
