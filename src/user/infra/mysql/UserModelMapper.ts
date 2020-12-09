import { User } from '../../domain/User';
import { UserEntity } from '../../entity/User.entity';

export class UserModelMapper {
  static toPersistence(user: User): UserEntity {
    return {
      id: user.id.toValue().toString(),
      name: user.name.value,
      createdAt: user.createdAt,
    };
  }
}
