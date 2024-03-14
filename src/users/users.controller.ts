import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesEnum } from './const/roles.const';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  signUp(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nickName') nickName: string,
    @Body('role') role: RolesEnum,
  ) {
    return this.usersService.signUp({ email, password, nickName, role });
  }

  @Get()
  userFindOne() {
    return this.usersService.findUser();
  }

  @Delete()
  userRemove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
