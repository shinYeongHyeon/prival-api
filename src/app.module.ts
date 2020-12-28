import * as Joi from 'joi';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { HealthModule } from './health/Health.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/JwtMiddleWare';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserEntity } from './user/entity/User.entity';
import { UsersCalendarEntity } from './calendar/entity/UsersCalendar.entity';
import { CalendarEntity } from './calendar/entity/Calendar.entity';
import { ScheduleEntity } from './schedule/entity/Schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('prod', 'dev', 'test'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: process.env.NODE_ENV === 'dev',
      entities: [
        UserEntity,
        UsersCalendarEntity,
        CalendarEntity,
        ScheduleEntity,
      ],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    HealthModule,
    UserModule,
    AuthModule,
    CalendarModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
