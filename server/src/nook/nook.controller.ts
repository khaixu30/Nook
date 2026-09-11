import { Controller } from '@nestjs/common';
import { NookService } from './nook.service.js';

@Controller('nook')
export class NookController {
  constructor(private readonly nookService: NookService) {}
}
