import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  signUp(@Body() body: SignInUserDto) {
    return this.userService.create(body);
  }

  @Post('/signin')
  signIn(@Body() body: SignUpUserDto) {
    return this.userService.findOne(body);
  }
}
