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

@Controller('ctmua')
export class CtmuaController {
  constructor(private readonly ctmuaService: CtmuaService) {}

  @Post()
  create(@Body() createCtmuaDto: CreateCtmuaDto) {
    return this.ctmuaService.create(createCtmuaDto);
  }

  @Get()
  findAll() {
    return this.ctmuaService.findAll();
  }

  @Get(':id')
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
