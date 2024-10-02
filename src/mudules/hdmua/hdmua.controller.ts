import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HdmuaService } from './hdmua.service';
import { CreateHdmuaDto } from './dto/create-hdmua.dto';
import { UpdateHdmuaDto } from './dto/update-hdmua.dto';

@Controller('hdmua')
export class HdmuaController {
  constructor(private readonly hdmuaService: HdmuaService) {}

  // @Post()
  // create(@Body() createHdmuaDto: CreateHdmuaDto) {
  //   return this.hdmuaService.create(createHdmuaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.hdmuaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hdmuaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHdmuaDto: UpdateHdmuaDto) {
  //   return this.hdmuaService.update(+id, updateHdmuaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hdmuaService.remove(+id);
  // }
}
