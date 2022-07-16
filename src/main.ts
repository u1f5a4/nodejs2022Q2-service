import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
