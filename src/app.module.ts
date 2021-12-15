import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliController } from './controller/aliController';
import { FileController } from './controller/fileController';
import { HomeController } from './controller/homeController';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { FileService } from './service/FileService';
import { FormatService } from './service/FormatService';
import { OSSService } from './service/OSSService';

@Module({
  imports: [],
  controllers: [AppController, HomeController, AliController, FileController],
  providers: [AppService, OSSService, FileService, FormatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api');
  }
}
