import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { IPet } from './Pet.interface';
import {
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiParam({
    name: 'Authorization',
    description: 'Content-Type: application/json',
  })
  @ApiOkResponse({
    status: 201,
    description: 'The record has been successfully created',
  })
  create(@Body() petToRegister: CreatePetDto): Promise<IPet> {
    return this.petService.create(petToRegister);
  }

  @Get('/listAll')
  @ApiParam({
    name: 'Authorization',
    description: 'Content-Type: application/json',
  })
  @ApiOkResponse({
    status: 200,
    description: 'All Pets Listed',
  })
  findAll(): Promise<IPet[]> {
    return this.petService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    status: 200,
    description: 'List just one Pet by ID',
  })
  findOne(@Param('id') id: string): Promise<IPet> {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<IPet> {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.petService.remove(id);
  }
}
