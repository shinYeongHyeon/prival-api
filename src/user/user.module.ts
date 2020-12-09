import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from './resolver/User.resolver';
import { UserEntity } from './entity/User.entity';
import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [CreateUserUseCase, UserResolver],
})
export class UserModule {}
