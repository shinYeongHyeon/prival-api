import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { UserEntity } from './entity/User.entity';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UserResolver } from './resolver/User.resolver';
import { LoginUseCase } from './application/Login/LoginUseCase';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'TEST', // TODO: NEED TO SET ENV
    }),
  ],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    UserResolver,
    {
      provide: 'USER_REPOSITORY',
      useClass: MysqlUserRepository,
    },
  ],
})
export class UserModule {}
