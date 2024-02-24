import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { PrismaService } from './prisma.service';
import { CaptchaService } from './captcha/captcha.service';
import { FileService } from './files/app.service';
import { StaticFilesModule } from './files/staticFiles.module';

@Module({
  imports: [StaticFilesModule],
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
