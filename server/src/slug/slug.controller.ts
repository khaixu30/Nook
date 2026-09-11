import { Controller } from '@nestjs/common';
import { SlugService } from './slug.service.js';

@Controller('slug')
export class SlugController {
  constructor(private readonly slugService: SlugService) {}
}
