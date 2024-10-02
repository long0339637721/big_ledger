import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CktmService } from './cktm.service';
import { CreateCktmDto } from './dto/create-cktm.dto';
import { UpdateCktmDto } from './dto/update-cktm.dto';

@Controller('cktm')
export class CktmController {
  constructor(private readonly cktmService: CktmService) {}

  // @Post()
  // create(@Body() createCktmDto: CreateCktmDto) {
  //   return this.cktmService.create(createCktmDto);
  // }

  // @Get()
  // findAll() {
  //   return this.cktmService.findAll();
  // }

  // @Get('customer/:id')
  // findByCustomer(@Param('id') id: string) {
  //   return this.cktmService.findByCustomer(+id);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cktmService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCktmDto: UpdateCktmDto) {
  //   return this.cktmService.update(+id, updateCktmDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cktmService.remove(+id);
  // }
}
