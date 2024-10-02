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
import { AnnouncementService } from './announcement.service';
import { GetAnnouncementDto } from './dto/get-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-annoucement';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({
    description: 'Get all announcement by status(isRead, isResolve) and types',
  })
  findAll(@Query() getAnnouncementDto: GetAnnouncementDto) {
    return this.announcementService.findAll(getAnnouncementDto);
  }

  // @Auth(USER_ROLE.ACCOUNTANT)
  // @Get('test')
  // test() {
  //   return 'cc';
  //   return this.announcementService.testMail();
  // }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get announcement by id' })
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update status of announcement by id' })
  update(@Param('id') id: string, @Body() updateDto: UpdateAnnouncementDto) {
    return this.announcementService.update(+id, updateDto);
  }
}
