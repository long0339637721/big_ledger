import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhieuXuatService } from './phieu-xuat.service';
import { CreatePhieuXuatDto } from './dto/create-phieu-xuat.dto';
import { UpdatePhieuXuatDto } from './dto/update-phieu-xuat.dto';

@Controller('phieu-xuat')
export class PhieuXuatController {
  constructor(private readonly phieuXuatService: PhieuXuatService) {}

  // @Post()
  // create(@Body() createPhieuXuatDto: CreatePhieuXuatDto) {
  //   return this.phieuXuatService.create(createPhieuXuatDto);
  // }

  // @Get()
  // findAll() {
  //   return this.phieuXuatService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.phieuXuatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhieuXuatDto: UpdatePhieuXuatDto) {
  //   return this.phieuXuatService.update(+id, updatePhieuXuatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuXuatService.remove(+id);
  // }
}
