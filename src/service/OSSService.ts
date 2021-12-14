import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { OssConfig } from '../configuration/oss';
import * as fs from 'fs';
import * as path from 'path';
import { fileUtil } from '../utils/fileUtil';

/**
 * oss api 相关服务
 */
@Injectable()
export class OSSService {
  getClientInstance = (bucket?) => {
    const config = new OssConfig();
    const client = new OSS({ ...config });
    return client;
  };

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
      const client = this.getClientInstance();
      const response = <unknown>await client.listBuckets({});
      const { buckets } = <IListBuckets>response;
      buckets.forEach((i) => console.log(i.name));
      return buckets;
    } catch (e) {
      console.log('getlistbuckets err', e);
      return 'getlistbuckets err';
    }
  }

  /**
   * 查看访问日志 TODO.. 好像不起作用
   * @returns
   */
  async getBucketLoggingByName(
    bucketName: string | null,
  ): Promise<unknown | string> {
    const client = this.getClientInstance();
    const result = <unknown>await client.getBucketLogging(bucketName);
    return result;
  }

  /**
   * 获取日志列表
   */
  async getPosLogFileLst(targetDir?: string) {
    const client = this.getClientInstance();
    const result = <unknown>(
      await client.list({ prefix: targetDir ?? '', 'max-keys': 10 }, null)
    );
    const { objects } = <OSS.ListObjectResult>result;
    return objects;
  }

  /**
   * 获取指定路径的所有文件
   * @param target
   */
  async getAllLogs(target?: string) {
    const client = this.getClientInstance();
    let marker = null;
    const fliter = '';
    const arr: OSS.ObjectMeta[] = [];
    const prefix = (target ?? '') + fliter;
    const maxkeys = 20;
    do {
      const result = await client.list({ prefix, 'max-keys': maxkeys }, null);
      if (!!result.objects) {
        arr.push(...result.objects);
      }
      marker = result.nextMarker;
    } while (marker);

    return arr;
  }

  /**
   * 按照商户号获取日志列表
   * @param target shopcode
   */
  async getLogListByShopcode(target?: string) {
    return this.getAllLogs(`windows/UserLog/${target}`);
  }

  /**
   * 下载对应文件
   * @param target 需要下载的文件路径 exp:'windows/UserLog/125806668_001_20200901155034_36543.zip'
   */
  async downloadLog(target: string, dir?: string) {
    const client = this.getClientInstance();
    const name = target;
    //is exist?
    // try{
    //   await client.head(name, {});
    // }
    // catch(err){
    //   if(err.code === 'NoSuchKey'){
    //     return 'log not exist'
    //   }
    // }
    //download
    const result = await client.getStream(target);
    console.log(result);
    const fileName = path.posix.basename(target);
    // const writeStream = fs.createWriteStream(`F:\\steam\\${fileName}`);
    const downloadPath = !dir
      ? `${__dirname}\\${fileName}`
      : path.join(dir, fileName);
    const writeStream = fs.createWriteStream(downloadPath);
    result.stream.pipe(writeStream);
  }

  /**
   * 按照shopcode下载对应商户日志
   * @param shopcode
   * @returns
   */
  async downloadLogByShopcode(shopcode: string) {
    if (this.isExistObject(shopcode)) {
      if (this.isExistObject(shopcode)) {
        const dir = path.join(__dirname, 'logFiles');
        const p = path.join(dir, shopcode);
        //创建相关文件夹
        fileUtil.CreateDirIfNotExist(p);
        //下载对应文件
        const logObjectMetas = await this.getLogListByShopcode(shopcode);
        //todo...需要标记下各个文件的下载进度
        logObjectMetas.forEach((i) => {
          // const str = i.url.match(/windows\/UserLog\/(\S*)/)[1];
          const str = i.url.match(/com\/(\S*)/)[1];
          this.downloadLog(str, p);
        });
        return 'success download';
      }
    }
    return 'fail download';
  }

  /**
   * 根据shopcode下载对应日志到文件夹
   */
  async downloadLogGroupByShopcode(shopcode: string) {
    //todo..
  }

  /**
   * 判断是否存在以shopcode开头的文件
   * @param shopcode
   * @returns bool
   */
  async isExistObject(shopcode: string) {
    try {
      const arr = await this.getLogListByShopcode(shopcode);
      if (arr instanceof Array) {
        return arr.length > 0 ? true : false;
      }
      return false;
    } catch (e) {
      console.log('isExistObject err' + e.message);
      return false;
    }
  }
}

interface IListBuckets {
  buckets: OSS.Bucket[];
  owner: any;
  isTruncated: any;
  nextMarker: any;
  res: any;
}
