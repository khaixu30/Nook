import { Test, TestingModule } from '@nestjs/testing';
import { NookController } from './nook.controller.js';
import { NookService } from './nook.service.js';

describe('NookController', () => {
  let controller: NookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NookController],
      providers: [NookService],
    }).compile();

    controller = module.get<NookController>(NookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
