import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { UserEntity } from './entity/User.entity';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UserResolver } from './resolver/User.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserUseCase,
    UserResolver,
    {
      provide: 'USER_REPOSITORY',
      useClass: MysqlUserRepository,
    },
  ],
})
export class UserModule {}
