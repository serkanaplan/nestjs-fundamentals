import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService, // DevConfigService normal olarak enjekte ediliyor
    @Inject('CONFIGDYNAMIC') private configDynamic: { port: number }, // 'CONFIGDYNAMIC' token'ı ile dinamik yapılandırma enjekte ediliyor
    @Inject('CONFIG')  private config: { port: number } // 'CONFIG' token'ı ile sabit config değeri enjekte ediliyor
  ) { }

  getHello = () => `DBHOST = ${this.devConfigService.getDBHOST()} PORT = ${this.configDynamic.port}`;

  getHello2 = () => `DBHOST = ${this.devConfigService.getDBHOST()} PORT = ${this.config.port}`;

}
