import { Module } from '@nestjs/common';
import { SlugService } from './slug.service.js';
import { SlugController } from './slug.controller.js';

@Module({
  controllers: [SlugController],
  providers: [SlugService],
})
export class SlugModule {}
