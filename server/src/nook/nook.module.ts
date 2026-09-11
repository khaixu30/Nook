import { Module } from '@nestjs/common';
import { NookService } from './nook.service.js';
import { NookController } from './nook.controller.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Nook} from "./entities/nook.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Nook])],
  controllers: [NookController],
  providers: [NookService],
})
export class NookModule {}
