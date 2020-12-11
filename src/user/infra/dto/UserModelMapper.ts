import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../../domain/User';
import { UserEntity } from '../../entity/User.entity';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';

export class UserModelMapper {
  static toDomain(entity: UserEntity): User {
    return User.create(
      {
        userName: UserName.create(entity.name).value,
        userEmail: UserEmail.create(entity.email).value,
        userPassword: UserPassword.create(entity.password).value,
        createdAt: entity.createdAt,
      },
      new UniqueEntityId(entity.id),
    ).value;
  }
}
