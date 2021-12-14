import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { query, Request } from 'express';
import { OSSService } from 'src/service/OSSService';

@Controller()
export class AliController {
  constructor(private readonly oss: OSSService) {}

  @Get('/api/ali/oss')
  async getUserInfo(@Req() request: Request): Promise<any> {
    const res = await this.oss.getListBuckets();
    return res;
  }

  @Get('/api/ali/getlog')
  async getBucketLog(@Query('bucketname') p: string): Promise<any> {
    const res = await this.oss.getBucketLoggingByName(p);
    return res;
  }

  @Get('/api/getloglst')
  async getloglst(@Query('path') path: string): Promise<any> {
    try {
      const res = await this.oss.getPosLogFileLst(path);
      return res;
    } catch (e) {
      console.log(e);
      return 'err';
    }
  }

  /**
   * 按照路径获取日志
   * @param path windows/UserLog/125990191
   * @returns
   */
  @Post('/api/getalllog')
  async getAllLog(@Query('path') path: string): Promise<any> {
    return await this.oss.getAllLogs(path);
  }

  /**
   * 根据商户号获取日志列表
   * @param shopcode 商户号
   * @returns
   */
  @Get('/api/getlogbyshopcode')
  async getLogByShopcode(@Query('shopcode') shopcode: string): Promise<any> {
    try {
      const res = await this.oss.getLogListByShopcode(shopcode);
      return res;
    } catch (e) {
      return 'fail:' + e.message;
    }
  }

  /**
   * 下载对应日志
   * @param url 'windows/UserLog/125806668_001_20200901155034_36543.zip'
   * @returns 'ok'
   */
  @Get('/api/downloadlog')
  async downloadlog(@Query('url') url: string): Promise<any> {
    await this.oss.downloadLog(url);
    return 'ok';
  }

  @Get('/api/downloadlogbyshopcode')
  async downloadLogByShopcode(
    @Query('shopcode') shopcode: string,
  ): Promise<any> {
    return await this.oss.downloadLogByShopcode(shopcode);
  }

  @Get('api/isexistlogbyshopcode')
  async isExistLogByShopcode(
    @Query('shopcode') shopcode: string,
  ): Promise<any> {
    const res = this.oss.isExistObject(shopcode);
    return res;
  }
}
