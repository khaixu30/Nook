import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {createUserDto} from "./dto/create-user.dto.js";
import { UserService } from "./user.service.js";
import { loginUserDto } from "./dto/login-user.dto.js"
import {UpdateUserDto} from "./dto/update-user.dto.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {JWTAuthGuard} from "../common/guards/auth.guard.js";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  async register(@Body() userData: createUserDto){
    return await this.userService.create(userData);
  }

  @Post('auth/login')
  async login(@Body() userData: loginUserDto) {
    return await this.userService.login(userData);
  }

  @UseGuards(JWTAuthGuard)
  @Patch('me/update')
  async update(@Body() userData: UpdateUserDto, @CurrentUser() user: any) {
    return await this.userService.update(userData, user.id);
  }

  @Get(':id')
  async get(@Param('id') id: string){
    return await this.userService.findById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: any){
    return user;
  }
}
