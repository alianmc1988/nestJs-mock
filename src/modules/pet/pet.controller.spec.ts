import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { PetController } from './pet.controller';
import { IPet } from './Pet.interface';
import { PetService } from './pet.service';

describe('PetController', () => {
  let controller: PetController;
  // Only needed if we don't want to use the database to run the tests
  const mockPetService = {
    findAll: (): IPet[] => [],
    create: (newPet: CreatePetDto): IPet => ({
      _id: new mongoose.Types.ObjectId().toString(),
      ...newPet,
    }),
  };
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
      const newPet: IPet = {
        name: 'Test',
        breed: 'Test',
        age: 1,
        type: 'Test',
        owner: 'Test',
      };
      const result = (await controller.create(newPet)) as IPet;
      expect(result).toBeDefined();
      expect(result).toMatchObject(newPet);
    });
  });
});
