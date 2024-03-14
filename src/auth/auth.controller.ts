import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users/signIn')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login({
      email,
      password,
    });
  }
}
