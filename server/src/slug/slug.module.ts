import { Module } from '@nestjs/common';
import { SlugService } from './slug.service.js';
import { SlugController } from './slug.controller.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Slug} from "./entities/slug.entity.js";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      TypeOrmModule.forFeature([Slug]),
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({})
  ],
  controllers: [SlugController],
  providers: [SlugService],
})
export class SlugModule {}
