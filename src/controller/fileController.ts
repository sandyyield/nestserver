import { Controller, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import * as path from 'path';
import { FileService } from 'src/service/FileService';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/api/file/getziplist')
  getUserInfo(@Query('account') shopcode: string): string {
    const dir = path.join('./', `logFiles\\${shopcode}`);
    return this.fileService.getZipList(dir);
  }
}
