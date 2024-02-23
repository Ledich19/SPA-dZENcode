import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveStaticOptions: {
        index: false, // Отключаем автоматический поиск index.html
      },
    }),
  ],
})
export class StaticFilesModule {}
