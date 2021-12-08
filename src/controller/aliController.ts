import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';
import { OSSService } from 'src/service/OSSService';

@Controller()
export class AliController {
  constructor(private readonly oss: OSSService) {}

  @Get('/api/ali/oss')
  async getUserInfo(@Req() request: Request): Promise<any> {
    const res = await this.oss.getListBuckets();
    return res;
  }
}
