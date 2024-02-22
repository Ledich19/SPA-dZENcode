import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { PrismaService } from './prisma.service';
import { CaptchaService } from './captcha/captcha.service';
import { FileService } from './files/app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    AppService,
    AppGateway,
    CaptchaService,
    FileService,
  ],
})
export class AppModule {}
