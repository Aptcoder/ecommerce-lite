import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/buyer')
  authBuyer(@Body() authUserDto: AuthUserDto) {
    return this.authService.authBuyer(authUserDto);
  }

  @HttpCode(200)
  @Post('/seller')
  authSeller(@Body() authUserDto: AuthUserDto) {
    return this.authService.authSeller(authUserDto);
  }
}
