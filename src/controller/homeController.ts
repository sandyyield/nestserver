import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller()
export class HomeController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/home')
  getUserInfo(@Req() request: Request): string {
    return 'userinfo' + request;
  }
  @Get('api/test/testparam')
  testparams(@Query('abc') p: string): string {
    return p + '123';
  }
}
