import * as fs from 'fs';
import * as path from 'path';

/**
 * 封装一些文件操作
 */
export const fileUtil = {
  /**
   * 如果不存在文件夹就创建
   * @param path
   */
  CreateDirIfNotExist(path: string) {
    try {
      if (!fs.existsSync(path)) {
        // fs.mkdirSync(path);
        this.makeDir(path);
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 一次性创建多级目录
   * @param dirpath path
   */
  makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
      let pathtmp;
      dirpath.split('\\').forEach(function (dirname) {
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
          if (dirname) {
            pathtmp = dirname;
          } else {
            pathtmp = '/';
          }
        }
        if (!fs.existsSync(pathtmp)) {
          fs.mkdirSync(pathtmp);
        }
      });
    }
  },
};
