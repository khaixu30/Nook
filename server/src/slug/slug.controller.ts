import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { SlugService } from './slug.service.js';
import {CreateSlugDto} from "./dto/create-slug.dto.js";
import {JWTAuthGuard} from "../common/guards/auth.guard.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UpdateSlugDto} from "./dto/update-slug.dto.js";

@Controller('slug')
export class SlugController {
  constructor(private readonly slugService: SlugService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateSlugDto, @CurrentUser() user: any){
    return await this.slugService.create(dto, user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Get('my')
  async getMine(@CurrentUser() user: any){
    return await this.slugService.getMySlugs(user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':slug')
  async findById(@Param('slug') slug: string, @CurrentUser() user: any) {
    return await this.slugService.findById(slug, user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':slug')
  async update(@Param('slug') slug: string, @CurrentUser() user: any, @Body() dto: UpdateSlugDto){
    return await this.slugService.update(slug, user.id, dto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':slug')
  async delete(@Param('slug') slug: string, @CurrentUser() user: any) {
    return await this.slugService.delete(slug, user.id);
  }

}
