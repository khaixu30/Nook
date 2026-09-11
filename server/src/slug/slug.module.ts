import { Module } from '@nestjs/common';
import { SlugService } from './slug.service.js';
import { SlugController } from './slug.controller.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Slug} from "./entities/slug.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Slug])],
  controllers: [SlugController],
  providers: [SlugService],
})
export class SlugModule {}
