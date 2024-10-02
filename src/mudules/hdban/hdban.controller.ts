import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HdbanService } from './hdban.service';
import { CreateHdbanDto } from './dto/create-hdban.dto';
import { UpdateHdbanDto } from './dto/update-hdban.dto';

@Controller('hdban')
export class HdbanController {
  constructor(private readonly hdbanService: HdbanService) {}

  // @Post()
  // create(@Body() createHdbanDto: CreateHdbanDto) {
  //   return this.hdbanService.create(createHdbanDto);
  // }

  // @Get()
  // findAll() {
  //   return this.hdbanService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hdbanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHdbanDto: UpdateHdbanDto) {
  //   return this.hdbanService.update(+id, updateHdbanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hdbanService.remove(+id);
  // }
}
