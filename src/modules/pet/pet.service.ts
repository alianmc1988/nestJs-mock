import { Catch, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { IPet } from './Pet.interface';

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') private readonly Pet: Model<IPet>) {}

  async create(newPet: CreatePetDto): Promise<IPet> {
    const registeredPet = new this.Pet(newPet);
    let response = null;
    try {
      response = await registeredPet.save();
    } catch (error) {
      throw new Error('Error en la BD');
    }
    return response;
  }

  async findAll(): Promise<IPet[]> {
    let listPet = [];
    try {
      listPet = await this.Pet.find();
    } catch (error) {
      throw new Error('Error en la BD');
    }
    return listPet;
  }

  async findOne(id: string): Promise<IPet> {
    let petFounded = null;
    try {
      petFounded = await this.Pet.find({ _id: id });
    } catch (error) {
      throw new Error('Error en la BD');
    }
    return petFounded ? petFounded : `Pet not found`;
  }

  async update(id: string, petToUpdate: UpdatePetDto): Promise<IPet> {
    let pet = null;
    try {
      pet = await this.Pet.findByIdAndUpdate(id, petToUpdate, {
        new: true,
      });
    } catch (error) {
      throw new Error('Error en la BD');
    }
    return pet ? pet : `Pet not found`;
  }

  async remove(id: string): Promise<string> {
    let pet = null;
    try {
      pet = await this.Pet.findByIdAndRemove(id);
    } catch (error: any) {
      throw new Error('Error en la BD');
    }
    return pet ? `Pet ${pet.name} was successfully removed` : `Pet not found`;
  }
}
