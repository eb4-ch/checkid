import { Get, Controller, Post, Body, FileInterceptor, UseInterceptors, UploadedFile, FilesInterceptor, UploadedFiles, Res } from '@nestjs/common';
import { AppService } from './services/app.service';
import { CheckIdService } from './services/checkid.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly checkIdService: CheckIdService,
  ) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files[]'))
  async upload(@Res() res, @UploadedFiles() files) {
    if (files.length === 2) {
      return this.checkIdService.detectFaces(files.map(file => file.buffer), res);
    }
  }
}
