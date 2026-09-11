import { Test, TestingModule } from '@nestjs/testing';
import { SlugController } from './slug.controller.js';
import { SlugService } from './slug.service.js';

describe('SlugController', () => {
  let controller: SlugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlugController],
      providers: [SlugService],
    }).compile();

    controller = module.get<SlugController>(SlugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
