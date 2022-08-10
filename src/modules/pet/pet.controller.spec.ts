import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PetSchema } from './entities/pet.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

describe('PetController', () => {
  let controller: PetController;

  // Only needed if we don't want to use the database to perform the tests
  const mockPetService = {
    findAll: () => ['one', 'two'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nestDBExample'),
        MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
      ],
      controllers: [PetController],
      providers: [PetService],
    }).compile();

    /*

    This is to mock the services for not to use the Database connection 
    And they go before the .compile() function above
    
      .overrideProvider(PetService)
      .useValue(mockPetService)
*/

    controller = module.get<PetController>(PetController);
  });

  describe('Success cases', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('When we make a GET request to /listAll, it should return an array of pets', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
