import { IUseCase } from '../../../shared/core/IUseCase';
import {
  EditUserProfileRequestDto,
  EditUserProfileResponse,
} from './dto/EditUserProfile.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class EditUserProfileUseCase
  implements IUseCase<EditUserProfileRequestDto, EditUserProfileResponse> {
  private FAIL_UPDATE = 'Can`t modify profile.';

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    request: EditUserProfileRequestDto,
  ): Promise<EditUserProfileResponse> {
    try {
      const foundUser = await this.userRepository.find(request.id);
      const user = User.create(
        {
          userName: UserName.create(request.name).value,
          userEmail: foundUser.email,
          userPassword: UserPassword.create(request.password).value,
          createdAt: foundUser.createdAt,
        },
        new UniqueEntityId(request.id),
      ).value;

      await this.userRepository.save(user);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: this.FAIL_UPDATE,
      };
    }
  }
}
