import { PartialType } from '@nestjs/mapped-types';
import { CreateReportCpmhDto } from './create-report-cpmh.dto';

export class UpdateReportCpmhDto extends PartialType(CreateReportCpmhDto) {}
