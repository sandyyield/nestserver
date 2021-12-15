import { Controller, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import * as path from 'path';
import { FileService } from 'src/service/FileService';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //todo...
  @Get('/api/file/getziplist')
  getUserInfo(@Query() req): string {
    const dir = path.join('./', `logFiles\\${req}`);
    return this.fileService.getZipList(dir);
  }
}
