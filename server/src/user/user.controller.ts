import {Body, Controller, Post} from '@nestjs/common';
import {createUserDto} from "./dto/createUser.dto.js";
import { UserService } from "./user.service.js";

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: createUserDto){
    return await this.userService.create(userData);
  }
}
