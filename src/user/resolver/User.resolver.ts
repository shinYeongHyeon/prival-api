import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '../domain/User';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
  CreateUserRequest,
  CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';
import {
  LoginRequest,
  LoginResponse,
} from '../application/Login/dto/Login.dto';
import { LoginUseCase } from '../application/Login/LoginUseCase';
import {
  FindUserRequest,
  FindUserResponse,
} from '../application/FindUser/dto/FindUser.dto';
import { FindUserUseCase } from '../application/FindUser/FindUserUseCase';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/AuthUser.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args('input') createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.execute(createUserRequest);
  }

  @Query(() => FindUserResponse)
  async find(
    @Args('input') findUserRequest: FindUserRequest,
  ): Promise<FindUserResponse> {
    return await this.findUserUseCase.execute(findUserRequest);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') loginRequest: LoginRequest,
  ): Promise<LoginResponse> {
    return await this.loginUseCase.execute(loginRequest);
  }
}
