import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { NookService } from './nook.service.js';
import {CreateNookDto} from "./dto/create-nook.dto.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {JWTAuthGuard} from "../common/guards/auth.guard.js";
import {UpdateNookDto} from "./dto/update-nook.dto.js";

@Controller('nook')
export class NookController {
  constructor(private readonly nookService: NookService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateNookDto, @CurrentUser() user: any){
    return await this.nookService.create(dto, user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Patch('update/:id')
  async update(@Body() dto: UpdateNookDto, @Param('id') id: string, @CurrentUser() user: any){
    return await this.nookService.findAndUpdate(dto, id, user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string, @CurrentUser() user: any){
    return await this.nookService.delete(id, user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Get('mine')
  async getAll(@CurrentUser() user: any){
    return await this.nookService.getMyNooks(user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string, @CurrentUser() user: any){
    return this.nookService.getById(id, user.id);
  }
}
