import { Test, TestingModule } from '@nestjs/testing';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

describe('PetController', () => {
  let controller: PetController;
  const mockPetService = {
    findAll: () => ['one', 'two'],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetController],
      providers: [PetService],
    })
      .overrideProvider(PetService)
      .useValue(mockPetService)
      .compile();

    controller = module.get<PetController>(PetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('When we make a GET request to /listAll, it should return an array of pets', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
  });
});
