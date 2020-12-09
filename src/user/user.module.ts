import { Module } from '@nestjs/common';

import { UserResolver } from './resolver/UserResolver';

@Module({
  providers: [UserResolver],
})
export class UserModule {}
