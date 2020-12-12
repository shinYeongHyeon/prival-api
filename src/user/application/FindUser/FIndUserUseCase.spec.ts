import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { FindUserUseCase } from './FindUserUseCase';

describe('FindUserUseCase', () => {
  const REQUEST_ID = 'REQUEST';
  const FOUND_EMAIL = 'found@found.com';
  const FOUND_NAME = 'founded';
  const HAS_NOT_USER = 'Can`t found User.';

  let uut: FindUserUseCase;
  let userRepository: MockProxy<IUserRepository>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    uut = new FindUserUseCase(userRepository);
  });

  function givenFoundUser(requestId: string) {
    userRepository.find.calledWith(requestId).mockResolvedValue(
      User.createNew({
        userEmail: UserEmail.create(FOUND_EMAIL).value,
        userName: UserName.create(FOUND_NAME).value,
        userPassword: UserPassword.create('pwdpwdpwd').value,
      }).value,
    );
  }

  it('생성되는지', () => {
    expect(uut).toBeDefined();
  });

  it('잘 찾아지는지', async () => {
    givenFoundUser(REQUEST_ID);

    const found = await uut.execute({ id: REQUEST_ID });

    expect(found.ok).toBe(true);
    expect(found.user.email).toBe(FOUND_EMAIL);
    expect(found.user.name).toBe(FOUND_NAME);
  });

  it('없는 아이디의 경우', async () => {
    givenFoundUser('NOT_EXIST_ID');

    const found = await uut.execute({ id: REQUEST_ID });

    expect(found.ok).toBe(false);
    expect(found.error).toBe(HAS_NOT_USER);
    expect(found.user).toBeUndefined();
  });
});
