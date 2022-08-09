import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

@Module({
  imports: [],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
