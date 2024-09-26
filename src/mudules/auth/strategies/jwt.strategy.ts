import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/mudules/employee/employee.service';
import { TokenExtractPayloadType } from '../types/token-extract-payload';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Extract and check for JSON Web Token. Return Unauthorized if token is invalid.
 * Otherwise, extract payload from token and assign it to request.user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: EmployeeService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenExtractPayloadType) {
    const user = await this.userService.findOneByEmail(payload.email);
    return user;
  }
}
