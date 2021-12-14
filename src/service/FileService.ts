import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 云端文件管理
 */
@Injectable()
export class FileService {
  getZipList = (path: string): any => {
    this.readDir(path);
    return 'string';
  };

  readDir = (entry) => {
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach((item) => {
      const location = path.join(entry, item);
      const info = fs.statSync(location);
      if (info.isDirectory()) {
        console.log(`dir: ${location}`);
        this.readDir(location);
      } else {
        console.log(`file: ${location}`);
      }
    });
  };
}
