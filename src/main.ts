import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/modules/app/app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '/', 'server'));
  app.setBaseViewsDir(join(__dirname, '/', 'server/views'));
  app.setViewEngine('hbs');
  // app.use('/', createProxyMiddleware({ target: 'http://127.0.0.1:3000/', changeOrigin: true }))
  await app.listen(3000);
}
bootstrap();
