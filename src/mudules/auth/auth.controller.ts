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
import { ApiTags, ApiOkResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
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

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get infor of current user and company' })
  getMe(@AuthUser() user: Accountant) {
    return this.authService.getMe(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch('me')
  @ApiOperation({ description: 'Update infor of current user' })
  updateMe(@AuthUser() user: Accountant, @Body() updateDto: UpdateEmployeeDto) {
    return this.authService.updateMe(user.id, updateDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get('download')
  @ApiOperation({
    description: 'Download excel file "example data to import DMH"',
  })
  downloadExcel(@Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      'assets',
      'excel',
      'Book1.xlsx',
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
