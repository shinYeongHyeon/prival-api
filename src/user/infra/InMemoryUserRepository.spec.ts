import { IUserRepository } from './interface/IUserRepository';
import { User } from '../domain/User';
import { UserName } from '../domain/UserName';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserPassword } from '../domain/UserPassword';

describe('InMemoryUserRepository', () => {
  const TEST_USER_NAME = '테스트';
  const TEST_USER_EMAIl = 'shindevil1@naver.com';
  const TEST_PASSWORD = '1234567';

  let uut: IUserRepository;
  let createdUser: User;
  let savedId: string;

  beforeAll(async () => {
    uut = new InMemoryUserRepository();
    const userName = UserName.create(TEST_USER_NAME).value;
    const userEmail = UserName.create(TEST_USER_EMAIl).value;
    const userPassword = UserPassword.create(TEST_PASSWORD).value;
    createdUser = await User.createNew({ userName, userEmail, userPassword })
      .value;
  });

  describe('save', () => {
    it('저장이 잘 되는지', async () => {
      const savedUser = await uut.save(createdUser);

      expect(createdUser.isEqual(savedUser)).toBe(true);

      savedId = savedUser.id.toValue().toString();
    });
  });

  describe('find', () => {
    it('잘 찾아지는지', async () => {
      const foundUser = await uut.find(savedId);

      expect(foundUser).toBeDefined();
      expect(foundUser.email.value).toEqual(TEST_USER_EMAIl);
      expect(foundUser.name.value).toEqual(TEST_USER_NAME);
      expect(foundUser.password.value).toEqual(TEST_PASSWORD);
    });

    it('없는 유저는 찾지 못하는지', async () => {
      const foundUser = await uut.find('unregistered Id');

      expect(foundUser).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('잘 찾아지는지', async () => {
      const foundUser = await uut.findByEmail(TEST_USER_EMAIl);

      expect(foundUser).toBeDefined();
      expect(foundUser.email.value).toEqual(TEST_USER_EMAIl);
      expect(foundUser.name.value).toEqual(TEST_USER_NAME);
      expect(foundUser.password.value).toEqual(TEST_PASSWORD);
    });

    it('없는 유저는 찾지 못하는지', async () => {
      const foundUser = await uut.findByEmail('unregisteredEmail');

      expect(foundUser).toBeUndefined();
    });
  });
});
