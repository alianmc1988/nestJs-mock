import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { Pet, PetSchema } from './entities/pet.entity';
import { PetController } from './pet.controller';
import { IPet } from './Pet.interface';
import { PetService } from './pet.service';

describe('PetController', () => {
  let controller: PetController;
  // Only needed if we don't want to use the database to run the tests
  const mockPetService = {
    findAll: (): IPet[] => [],
    create: (newPet: Pet): IPet => ({
      _id: new mongoose.Types.ObjectId().toString(),
      ...newPet,
    }),
  };
  let newPet: Pet;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [
      //   MongooseModule.forRoot('mongodb://localhost/nestDBExample'),
      //   MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
      // ],
      controllers: [PetController],
      providers: [PetService],
    })
      /*
    These two functions below are used to mock the services to NO use the Database connection
      .overrideProvider(PetService)
      .useValue(mockPetService)
    */
      .overrideProvider(PetService)
      .useValue(mockPetService)
      .compile();

    controller = module.get<PetController>(PetController);
  });

  describe('Success cases', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('When we make a GET request to /pet, it should return an array of pets', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('When we make a POST request to /pet, it should return the pet created', async () => {
      newPet = new Pet('Tweet', 'sparrow', 5, 'bird', '654654asdsdas');
      const result = await controller.create(newPet);
      expect(result).toBeDefined();
      expect(result).toMatchObject(newPet);
    });
  });
});
