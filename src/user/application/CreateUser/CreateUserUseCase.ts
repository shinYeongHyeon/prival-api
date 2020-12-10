import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { UserName } from '../../domain/UserName';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';
import { UserEmail } from '../../domain/UserEmail';

export class CreateUserUseCase
  implements IUseCase<CreateUserRequest, CreateUserResponse> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const userNameOrError = UserName.create(request.name);
    const userEmailOrError = UserEmail.create(request.email);

    const user = User.createNew({
      userName: userNameOrError.value,
      userEmail: userEmailOrError.value,
    }).value;

    await this.userRepository.save(user, request.password);

    return {
      ok: true,
      user: {
        id: user.id.toValue().toString(),
        email: user.email.value,
        name: user.name.value,
      },
    };
  }
}
