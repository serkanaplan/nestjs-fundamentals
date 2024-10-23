import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe, NestJS'de gelen isteklerin (request) ve yanıtların (response) doğrulaması için kullanılan bir yapılandırmadır. 
  // Bu pipe, istek verilerinin doğruluğunu kontrol etmek için genellikle DTO (Data Transfer Object) ile birlikte kullanılır.
  // Bu, uygulamanızdaki tüm controller'lar ve route'lar için otomatik olarak veri doğrulama sağlar. 
  // Böylece, geçersiz veya hatalı veriler uygulamanıza ulaşmadan önce filtrelenir.
  // ValidationPipe uygulamanın genelinde geçerli iken, ParseIntPipe belirli bir route parametresi için geçerlidir.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
