import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportThcnService } from './report-thcn.service';
import { CreateReportThcnDto } from './dto/create-report-thcn.dto';
import { UpdateReportThcnDto } from './dto/update-report-thcn.dto';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@Controller('report-thcn')
export class ReportThcnController {
  constructor(private readonly reportThcnService: ReportThcnService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  create(@Body() createReportThcnDto: CreateReportThcnDto) {
    return this.reportThcnService.create(createReportThcnDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post('raw')
  findRaw(@Body() createReportThcnDto: CreateReportThcnDto) {
    return this.reportThcnService.findRaw(createReportThcnDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  findAll() {
    return this.reportThcnService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportThcnService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportThcnDto: UpdateReportThcnDto) {
  //   return this.reportThcnService.update(+id, updateReportThcnDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportThcnService.remove(+id);
  }
}
