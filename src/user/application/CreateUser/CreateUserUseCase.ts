import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { UserName } from '../../domain/UserName';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';

export class CreateUserUseCase
  implements IUseCase<CreateUserRequest, CreateUserResponse> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const userNameOrError = UserName.create(request.name);
    const user = User.createNew({
      userName: userNameOrError.value,
    }).value;

    await this.userRepository.save(user);

    return {
      ok: true,
      user: {
        id: user.id.toValue().toString(),
        name: user.name.props.value,
        createdAt: user.createdAt,
      },
    };
  }
}
