import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './user/user.module';
import { HealthModule } from './health/HealthModule';

@Module({
  imports: [
    HealthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
