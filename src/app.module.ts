import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliController } from './controller/aliController';
import { HomeController } from './controller/homeController';
import { OSSService } from './service/OSSService';

@Module({
  imports: [],
  controllers: [AppController, HomeController, AliController],
  providers: [AppService, OSSService],
})
export class AppModule {}
