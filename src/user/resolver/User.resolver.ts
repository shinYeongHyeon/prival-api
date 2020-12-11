import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../domain/User';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
  CreateUserRequest,
  CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';
import { LoginRequest, LoginResponse } from '../application/Login/dto/Login.dto';
import { LoginUseCase } from '../application/Login/LoginUseCase';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args('input') createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.execute(createUserRequest);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') loginRequest: LoginRequest): Promise<LoginResponse> {
    return await this.loginUseCase.execute(loginRequest);
  }
}
