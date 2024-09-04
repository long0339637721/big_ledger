import { PartialType } from '@nestjs/swagger';
import { CreateReportNoPhaiTraDto } from './create-report-no-phai-tra.dto';

export class UpdateReportNoPhaiTraDto extends PartialType(CreateReportNoPhaiTraDto) {}
