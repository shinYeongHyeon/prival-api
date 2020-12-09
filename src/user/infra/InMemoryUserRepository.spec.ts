import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { IUserRepository } from './interface/IUserRepository';
import { User } from '../domain/User';
import { UserName } from '../domain/UserName';
import { InMemoryUserRepository } from './InMemoryUserRepository';

describe('InMemoryUserRepository', () => {
  let uut: IUserRepository;

  beforeAll(() => {
    uut = new InMemoryUserRepository();
  });

  describe('save', () => {
    it('저장이 잘 되는지', async () => {
      const userId = new UniqueEntityId();
      const createdAt = new Date();
      const userName = UserName.create('테스트').value;
      const createdUser = await User.create({ createdAt, userName }, userId)
        .value;

      const savedUser = await uut.save(createdUser);

      expect(createdUser.isEqual(savedUser)).toBe(true);
    });
  });
});
