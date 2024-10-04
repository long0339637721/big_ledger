import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { validateHash } from '../../common/utils';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { USER_ROLE } from 'src/constants';
import { UpdateEmployeeDto } from '../employee/dto/update-employee.dto';
import { Accountant } from '../employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.employeeService.findOneByEmail(loginDto.email);
    // console.log('password: ', loginDto.password);
    // console.log('hash: ', user.password);
    const comparePassword = await validateHash(
      loginDto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const payload = {
      id: user.id,
      email: user.email,
      isAmin: user.isAdmin,
    };
    const token = await this.jwtService.signAsync(payload);
    return new AuthResponseDto(token);
  }

  async getMe(user: Accountant) {
    if (user.isAdmin) {
      return {
        ...user,
        company: user,
      };
    } else {
      const admin = await this.employeeService.findAmin();
      return {
        ...user,
        company: admin,
      };
    }
  }

  updateMe(userId: number, updateDto: UpdateEmployeeDto) {
    return this.employeeService.update(userId, updateDto);
  }
}
