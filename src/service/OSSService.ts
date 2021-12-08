import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { OssConfig } from '../configuration/oss';

/**
 * oss api 相关服务
 */
@Injectable()
export class OSSService {
  getOssHello(msg?: string): string {
    return `Hello oss!  ${msg}`;
  }

  /**
   * 获取bucket列表  
   * TOFIX...  按照定义的类型上来说返回的应该是Promise<OSS.Bucket[]>类型， 为什么实际返回的是
   * {
   *    "buckets":...,
   *    "owner":...,
   *    "isTruncated":...,
   *    "nextMarker":...,
   *    "res":...
   * }
   * @returns buckets 列表
   */
  async getListBuckets(): Promise<OSS.Bucket[] | string> {
    try {
      const config = new OssConfig();
      const client = new OSS({
        region: config.region,
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
      });
      const response = await client.listBuckets({});
      // response.forEach(i => console.log(i.name)
      // )
      const lst = response;
      return lst;
    }
    catch (ex: any) {
      console.log('getlistbuckets err', ex);
      return 'getlistbuckets err';
    }
  }
}
