import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import IndexModules from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    IndexModules.PersonaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
