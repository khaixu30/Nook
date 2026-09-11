import { Module } from '@nestjs/common';
import { NookService } from './nook.service.js';
import { NookController } from './nook.controller.js';

@Module({
  controllers: [NookController],
  providers: [NookService],
})
export class NookModule {}
