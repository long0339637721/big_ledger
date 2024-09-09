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
import { PhieuChiService } from './phieu-chi.service';
import {
  CreatePhieuChiTienMatDto,
  CreatePhieuChiTienGuiDto,
  CreatePhieuChiKhacDto,
} from './dto/create-phieu-chi.dto';
import {
  UpdatePhieuChiTienMatDto,
  UpdatePhieuChiTienGuiDto,
  UpdatePhieuChiKhacDto,
} from './dto/update-phieu-chi.dto';
import { GetPhieuChiDto } from './dto/get-phieu-chi.dto';

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

  @Get('get-by-date')
  findByDate(@Query() query: GetPhieuChiDto) {
    return this.phieuChiService.findByDate(query, 'tienMat');
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

  @Get('get-by-date')
  findByDate(@Query() query: GetPhieuChiDto) {
    return this.phieuChiService.findByDate(query, 'tienGui');
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

@Controller('phieu-chi-khac')
export class PhieuChiKhacController {
  constructor(private readonly phieuChiService: PhieuChiService) {}

  @Post()
  create(@Body() createPhieuChiDto: CreatePhieuChiKhacDto) {
    return this.phieuChiService.createKhac(createPhieuChiDto);
  }

  @Get()
  findAll() {
    return this.phieuChiService.findAllKhac();
  }

  @Get('get-by-date')
  findByDate(@Query() query: GetPhieuChiDto) {
    return this.phieuChiService.findByDate(query, 'khac');
  }

  @Get('get-all-by-date')
  findAllByDate(@Query() query: GetPhieuChiDto) {
    return this.phieuChiService.findByDate(query, 'all');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phieuChiService.findOneKhac(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePhieuChiDto: UpdatePhieuChiKhacDto,
  // ) {
  //   return this.phieuChiService.updateKhac(+id, updatePhieuChiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuChiService.removeKhac(+id);
  // }
}
