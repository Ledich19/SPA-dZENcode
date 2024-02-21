import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { PrismaService } from './prisma.service';
import { CaptchaService } from './captcha/captcha.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, AppService, AppGateway, CaptchaService],
})
export class AppModule {}
