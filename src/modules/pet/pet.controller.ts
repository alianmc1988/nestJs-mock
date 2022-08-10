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
  ApiParam,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiParam({
    name: 'Authorization',
    description: 'Bearer Token',
    required: false,
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  create(@Body() petToRegister: CreatePetDto): Promise<IPet> {
    return this.petService.create(petToRegister);
  }

  @Get('')
  @ApiParam({
    name: 'Authorization',
    description: 'Bearer token',
    required: false,
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
