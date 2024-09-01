import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Patch,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { USER_ROLE } from 'src/constants';
import { Auth } from 'src/decorators/http.decorators';
import { AuthUser } from 'src/decorators';
import { Accountant } from '../employee/entities/employee.entity';
import { UpdateEmployeeDto } from '../employee/dto/update-employee.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Auth([USER_ROLE.ACCOUNTANT])
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@AuthUser() user: Accountant) {
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully',
    type: AuthResponseDto,
  })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('me')
  @Auth([USER_ROLE.ACCOUNTANT])
  updateMe(@AuthUser() user: Accountant, @Body() updateDto: UpdateEmployeeDto) {
    return this.authService.updateMe(user.id, updateDto);
  }

  @Get('download')
  downloadExcel(@Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      'assets',
      'excel',
      'book1.xlsx',
    );
    if (fs.existsSync(filePath)) {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'book1.xlsx',
      );
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send('File not found');
    }
  }
}
