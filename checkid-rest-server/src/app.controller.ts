import { Get, Controller, Post, Body, FileInterceptor, UseInterceptors, UploadedFile, FilesInterceptor, UploadedFiles } from '@nestjs/common';
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

  @Get('test')
  test() {
    this.checkIdService.detect();
    return 'Made the test, homey!';
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files[]'))
  async upload(@UploadedFiles() files) {
    // const i = await this.checkIdService.detectFaces(base64.file);
    const u = files;
    return u;
  }
}
