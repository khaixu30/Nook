import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';
import {ConfigModule} from "@nestjs/config";
import { NookModule } from './nook/nook.module.js';
import { SlugModule } from './slug/slug.module.js';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) ,UserModule, DatabaseModule, NookModule, SlugModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
