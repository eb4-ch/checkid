import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { CheckIdService } from './services/checkid.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CheckIdService],
})
export class AppModule {}
