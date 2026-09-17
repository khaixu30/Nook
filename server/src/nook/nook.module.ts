import { Module } from '@nestjs/common';
import { NookService } from './nook.service.js';
import { NookController } from './nook.controller.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nook} from "./entities/nook.entity.js";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../user/strategies/jwt.strategy.js";
import {Slug} from "../slug/entities/slug.entity.js";
import {SlugController} from "../slug/slug.controller.js";
import {SlugService} from "../slug/slug.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Nook]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({})
  ],
  controllers: [NookController],
  providers: [NookService],
})
export class NookModule {}
