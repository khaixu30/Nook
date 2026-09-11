import { Test, TestingModule } from '@nestjs/testing';
import { NookService } from './nook.service.js';

describe('NookService', () => {
  let service: NookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NookService],
    }).compile();

    service = module.get<NookService>(NookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
