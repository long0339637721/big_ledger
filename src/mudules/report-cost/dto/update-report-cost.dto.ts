import { PartialType } from '@nestjs/mapped-types';
import { CreateReportCostDto } from './create-report-cost.dto';

export class UpdateReportCostDto extends PartialType(CreateReportCostDto) {}
