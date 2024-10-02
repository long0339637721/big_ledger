import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhieuThuService } from './phieu-thu.service';
import {
  CreatePhieuThuTienMatDto,
  CreatePhieuThuTienGuiDto,
} from './dto/create-phieu-thu.dto';
import {
  UpdatePhieuThuTienMatDto,
  UpdatePhieuThuTienGuiDto,
} from './dto/update-phieu-thu.dto';
import { USER_ROLE } from 'src/constants';
import { Auth } from 'src/decorators/http.decorators';
import { ApiOperation } from '@nestjs/swagger';

@Controller('phieu-thu-tien-mat')
export class PhieuThuTienMatController {
  constructor(private readonly phieuThuService: PhieuThuService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new phieu thu tien mat' })
  create(@Body() createPhieuThuDto: CreatePhieuThuTienMatDto) {
    return this.phieuThuService.createTienMat(createPhieuThuDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all phieu thu tien mat' })
  findAll() {
    return this.phieuThuService.findAllTienMat();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get phieu thu tien mat by id' })
  findOne(@Param('id') id: string) {
    return this.phieuThuService.findOneTienMat(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePhieuThuDto: UpdatePhieuThuDto,
  // ) {
  //   return this.phieuThuService.updateTienMat(+id, updatePhieuThuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuThuService.removeTienMat(+id);
  // }
}

@Controller('phieu-thu-tien-gui')
export class PhieuThuTienGuiController {
  constructor(private readonly phieuThuService: PhieuThuService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new phieu thu tien gui' })
  create(@Body() createPhieuThuDto: CreatePhieuThuTienGuiDto) {
    return this.phieuThuService.createTienGui(createPhieuThuDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all phieu thu tien gui' })
  findAll() {
    return this.phieuThuService.findAllTienGui();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get phieu thu tien gui by id' })
  findOne(@Param('id') id: string) {
    return this.phieuThuService.findOneTienGui(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePhieuThuDto: UpdatePhieuThuDto,
  // ) {
  //   return this.phieuThuService.updateTienGui(+id, updatePhieuThuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.phieuThuService.removeTienGui(+id);
  // }
}
