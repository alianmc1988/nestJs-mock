import { Test, TestingModule } from '@nestjs/testing';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;
  const mockPetService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetService],
    })
      .overrideProvider(PetService)
      .useValue(mockPetService)
      .compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
