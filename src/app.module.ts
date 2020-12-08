import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
