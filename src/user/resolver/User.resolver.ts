import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../domain/User';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
  CreateUserRequest,
  CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Mutation(() => CreateUserResponse)
  createUser(
    @Args('input') createUserRequest: CreateUserRequest,
  ): CreateUserResponse {
    return this.createUserUseCase.execute(createUserRequest);
  }
}
