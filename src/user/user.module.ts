import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { LoginUseCase } from './application/Login/LoginUseCase';
import { FindUserUseCase } from './application/FindUser/FindUserUseCase';
import { EditUserProfileUseCase } from './application/EditUserProfile/EditUserProfileUseCase';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UserEntity } from './entity/User.entity';
import { UserResolver } from './resolver/User.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    LoginUseCase,
    EditUserProfileUseCase,
    UserResolver,
    {
      provide: 'USER_REPOSITORY',
      useClass: MysqlUserRepository,
    },
  ],
  exports: [FindUserUseCase],
})
export class UserModule {}
