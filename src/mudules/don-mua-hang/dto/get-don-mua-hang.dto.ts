// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsOptional, ValidateBy } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { DOCUMENT_STATUS, DocumentStatusType } from 'src/constants';

// import { PageOptionsDto } from 'src/common/dto/page-options.dto';
// import { ORDER } from 'src/constants';

// function isSortOption(value: string): boolean {
//   const sortValueParts = value.split(':');
//   if (sortValueParts.length !== 2) {
//     return false;
//   }
//   for (const order of Object.values(ORDER)) {
//     if (sortValueParts[1] === order) {
//       return true;
//     }
//   }
//   return false;
// }

// export class GetDonMuaHangDto extends PageOptionsDto {
//   @ApiPropertyOptional()
//   @ValidateBy(
//     {
//       name: 'isSortOption',
//       validator: {
//         validate: (value, args): boolean => isSortOption(value),
//         defaultMessage: () => '',
//       },
//       async: false,
//     },
//     {
//       each: true,
//       message: 'Value of sort options is not valid',
//     },
//   )
//   // @IsArray()
//   @IsOptional()
//   sorts?: string[] | string;
// }
export class GetDonMuaHangDto {
  @ApiProperty({ example: '2024-09-01' })
  @IsDateString(undefined, { message: 'startDate must be a date string' })
  @IsNotEmpty({ message: 'startDate is required' })
  startDate: string;

  @ApiProperty({ example: '2024-09-31' })
  @IsDateString(undefined, { message: 'endDate must be a date string' })
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: string;

  @ApiPropertyOptional({ example: ['UNDOCUMENTED'] })
  @IsIn(Object.values(DOCUMENT_STATUS), {
    message: 'Document status is not valid',
    each: true,
  })
  @IsArray({ message: 'Document status must be an array' })
  @IsOptional()
  paymentStatus?: DocumentStatusType[] = [
    DOCUMENT_STATUS.DOCUMENTED,
    DOCUMENT_STATUS.DOCUMENTING,
    DOCUMENT_STATUS.UNDOCUMENTED,
  ];
}
