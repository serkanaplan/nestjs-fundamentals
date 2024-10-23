import { Injectable, NestMiddleware } from '@nestjs/common';

// Middleware, request ve response döngüsü içinde çalışan ve request nesnesi, response nesnesi ve next() fonksiyonuna erişimi olan bir fonksiyondur.

// Nasıl çalışır:
// Middleware, bir request geldiğinde route handler'dan önce çalışır.
// Request ve response nesnelerine erişebilir ve bunları değiştirebilir.
// Request-response döngüsünü sonlandırabilir.
// Bir sonraki middleware fonksiyonunu çağırabilir (next()).

// Amacı ve neden kullanılır:
// Kod tekrarını önlemek
// Cross-cutting concerns'leri (loglama, hata yakalama, güvenlik vb.) yönetmek
// Request/response manipülasyonu
// Performans ölçümü
// Kimlik doğrulama ve yetkilendirme
// Request body parsing

// Nasıl kullanılır:
// Fonksiyon olarak
// Class olarak (@Injectable() dekoratörü ile)
// Global, modül veya route seviyesinde uygulanabilir
// Bu middleware'i herhangi bir modüle uygulayabilirsin
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request ....', new Date().toDateString());
    next();
  }
}
