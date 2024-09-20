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

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  findAll(@Query() getAnnouncementDto: GetAnnouncementDto) {
    return this.announcementService.findAll(getAnnouncementDto);
  }

  @Get('test')
  test() {
    return 'cc';
    return this.announcementService.testMail();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateAnnouncementDto) {
    return this.announcementService.update(+id, updateDto);
  }
}
