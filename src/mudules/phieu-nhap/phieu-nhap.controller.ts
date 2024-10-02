import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhieuNhapService } from './phieu-nhap.service';
import { CreatePhieuNhapDto } from './dto/create-phieu-nhap.dto';
import { UpdatePhieuNhapDto } from './dto/update-phieu-nhap.dto';

@Controller('phieu-nhap')
export class PhieuNhapController {
  constructor(private readonly phieuNhapService: PhieuNhapService) {}

  // @Post()
  // create(@Body() createPhieuNhapDto: CreatePhieuNhapDto) {
  //   return this.phieuNhapService.create(createPhieuNhapDto);
  // }

  // @Get()
  // findAll() {
  //   return this.phieuNhapService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.phieuNhapService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhieuNhapDto: UpdatePhieuNhapDto) {
  //   return this.phieuNhapService.update(+id, updatePhieuNhapDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuNhapService.remove(+id);
  // }
}
