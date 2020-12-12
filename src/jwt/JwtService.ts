import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_OPTIONS } from '../shared/constants/CoreConstants';

export interface JwtModuleOptions {
  privateKey: string;
}

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: any): string {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
