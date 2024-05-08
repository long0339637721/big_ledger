import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

export class GetAnnouncementDto {
  @ApiProperty({ type: 'boolean', example: false })
  @IsBooleanString({ message: 'isRead must be a boolean' })
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ type: 'boolean', example: false })
  @IsBooleanString({ message: 'isRead must be a boolean' })
  @IsOptional()
  isResolved?: boolean;
}