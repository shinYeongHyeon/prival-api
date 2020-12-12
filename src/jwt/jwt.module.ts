import { DynamicModule, Global, Module } from '@nestjs/common';

import { JwtModuleOptions, JwtService } from './JwtService';
import { CONFIG_OPTIONS } from '../shared/constants/CoreConstants';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [JwtService],
})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
