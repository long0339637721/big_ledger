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
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('phieu-chi-tien-mat')
export class PhieuChiTienMatController {
  constructor(private readonly phieuChiService: PhieuChiService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new phieu chi tien mat' })
  create(@Body() createPhieuChiDto: CreatePhieuChiTienMatDto) {
    return this.phieuChiService.createTienMat(createPhieuChiDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all phieu chi tien mat' })
  findAll() {
    return this.phieuChiService.findAllTienMat();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('get-by-date')
  @ApiOperation({ description: 'Get phieu chi tien mat by date' })
  findByDate(@Query() query: GetPhieuChiDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.phieuChiService.findByDate(startDate, endDate, 'tienMat');
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get phieu chi tien mat by id' })
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

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new phieu chi tien gui' })
  create(@Body() createPhieuChiDto: CreatePhieuChiTienGuiDto) {
    return this.phieuChiService.createTienGui(createPhieuChiDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all phieu chi tien gui' })
  findAll() {
    return this.phieuChiService.findAllTienGui();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('get-by-date')
  @ApiOperation({ description: 'Get phieu chi tien gui by date' })
  findByDate(@Query() query: GetPhieuChiDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.phieuChiService.findByDate(startDate, endDate, 'tienGui');
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get phieu chi tien gui by id' })
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

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new phieu chi khac' })
  create(@Body() createPhieuChiDto: CreatePhieuChiKhacDto) {
    return this.phieuChiService.createKhac(createPhieuChiDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all phieu chi khac' })
  findAll() {
    return this.phieuChiService.findAllKhac();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('get-by-date')
  @ApiOperation({ description: 'Get phieu chi khac by date' })
  findByDate(@Query() query: GetPhieuChiDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.phieuChiService.findByDate(startDate, endDate, 'khac');
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('get-all-by-date')
  @ApiOperation({ description: 'Get all phieu chi by date' })
  findAllByDate(@Query() query: GetPhieuChiDto) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    return this.phieuChiService.findByDate(startDate, endDate, 'all');
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get phieu chi khac by id' })
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
