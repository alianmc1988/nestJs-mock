import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './modules/pet/pet.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestDBExample'),
    PetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor');
  }
}
