import { Module } from '@nestjs/common';

import { UserResolver } from './resolver/user.resolver';

@Module({
  providers: [UserResolver],
})
export class UserModule {}
