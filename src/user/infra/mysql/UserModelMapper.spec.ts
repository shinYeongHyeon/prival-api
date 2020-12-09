import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../../domain/User';
import { UserName } from '../../domain/UserName';
import { UserModelMapper } from './UserModelMapper';

describe('UserModelMapper', () => {
  it('toPersistence 가 잘 되는지', () => {
    const uniqueEntityId = new UniqueEntityId();
    const createdUser = User.create(
      {
        userName: UserName.create('TEST').value,
        createdAt: new Date(),
      },
      uniqueEntityId,
    ).value;

    const userEntity = UserModelMapper.toPersistence(createdUser);

    expect(userEntity.id).toEqual(uniqueEntityId.toValue().toString());
  });
});
