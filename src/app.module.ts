import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './controller/homeController';

@Module({
  imports: [],
  controllers: [AppController, HomeController],
  providers: [AppService],
})
export class AppModule {}
