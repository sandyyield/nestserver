import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliController } from './controller/aliController';
import { FileController } from './controller/fileController';
import { HomeController } from './controller/homeController';
import { FileService } from './service/FileService';
import { OSSService } from './service/OSSService';

@Module({
  imports: [],
  controllers: [AppController, HomeController, AliController, FileController],
  providers: [AppService, OSSService, FileService],
})
export class AppModule {}
