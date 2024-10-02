import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DieuKhoanService } from './dieu-khoan.service';
import { CreateDieuKhoanDto } from './dto/create-dieu-khoan.dto';
import { UpdateDieuKhoanDto } from './dto/update-dieu-khoan.dto';

@Controller('dieu-khoan')
export class DieuKhoanController {
  constructor(private readonly dieuKhoanService: DieuKhoanService) {}

  // @Post()
  // create(@Body() createDieuKhoanDto: CreateDieuKhoanDto) {
  //   return this.dieuKhoanService.create(createDieuKhoanDto);
  // }

  // @Get()
  // findAll() {
  //   return this.dieuKhoanService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dieuKhoanService.findOne(+id);
  // }

  // @Get('customer/:id')
  // findByCustomer(@Param('id') id: string) {
  //   return this.dieuKhoanService.findByCustomer(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDieuKhoanDto: UpdateDieuKhoanDto,
  // ) {
  //   return this.dieuKhoanService.update(+id, updateDieuKhoanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dieuKhoanService.remove(+id);
  // }
}
