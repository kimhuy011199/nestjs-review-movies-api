import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: SignUpUserDto) {
    return this.authService.create(body);
  }

  @Post('/signin')
  signIn(@Body() body: SignInUserDto) {
    return this.authService.findOne(body);
  }
}
