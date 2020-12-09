import { IUseCase } from '../../../shared/core/IUseCase';
import { UserName } from '../../domain/UserName';
import { User } from '../../domain/User';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';

export class CreateUserUseCase
  implements IUseCase<CreateUserRequest, CreateUserResponse> {
  execute(request: CreateUserRequest): CreateUserResponse {
    const userNameOrError = UserName.create(request.name);
    const user = User.createNew({
      userName: userNameOrError.value,
    }).value;

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
