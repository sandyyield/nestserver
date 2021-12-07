import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller()
export class HomeController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/homehello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/home')
  getUserInfo(@Req() request: Request): string {
    // console.log(request);
    console.log(request);

    return 'userinfo' + request.query;
  }
}
