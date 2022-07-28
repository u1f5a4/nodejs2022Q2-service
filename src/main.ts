import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './module/http-exception.filter';
import { Logger } from './module/logger/logger.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useLogger(app.get(Logger));

  await app.listen(PORT);
}
bootstrap();
