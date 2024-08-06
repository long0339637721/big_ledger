import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhieuChiService } from './phieu-chi.service';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
} from './dto/create-phieu-chi.dto';
import {
  UpdatePhieuChiTienMatDto,
  UpdatePhieuChiTienGuiDto,
} from './dto/update-phieu-chi.dto';

@Controller('phieu-chi-tien-mat')
export class PhieuChiTienMatController {
  constructor(private readonly phieuChiService: PhieuChiService) {}

  @Post()
  create(@Body() createPhieuChiDto: CreatePhieuChiTienMatDto) {
    return this.phieuChiService.createTienMat(createPhieuChiDto);
  }

  @Get()
  findAll() {
    return this.phieuChiService.findAllTienMat();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phieuChiService.findOneTienMat(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePhieuChiDto: UpdatePhieuChiTienMatDto,
  // ) {
  //   return this.phieuChiService.updateTienMat(+id, updatePhieuChiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuChiService.removeTienMat(+id);
  // }
}

@Controller('phieu-chi-tien-gui')
export class PhieuChiTienGuiController {
  constructor(private readonly phieuChiService: PhieuChiService) {}

  @Post()
  create(@Body() createPhieuChiDto: CreatePhieuChiTienGuiDto) {
    return this.phieuChiService.createTienGui(createPhieuChiDto);
  }

  @Get()
  findAll() {
    return this.phieuChiService.findAllTienGui();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phieuChiService.findOneTienGui(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePhieuChiDto: UpdatePhieuChiTienGuiDto,
  // ) {
  //   return this.phieuChiService.updateTienGui(+id, updatePhieuChiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuChiService.removeTienGui(+id);
  // }
}
