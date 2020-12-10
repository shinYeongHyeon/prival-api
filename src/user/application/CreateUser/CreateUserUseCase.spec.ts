import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUserUseCase } from './CreateUserUseCase';
import { IUserRepository } from '../../infra/interface/IUserRepository';

describe('CreateUserUseCase', () => {
  const USER_NAME = '신영현';
  const USER_EMAIL = 'den.shin.dev@gmail.com';
  const USER_PASSWORD = '123456';

  let uut: CreateUserUseCase;
  let userRepository: MockProxy<IUserRepository>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    uut = new CreateUserUseCase(userRepository);
  });

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('유저 Create', async () => {
    const createUserResponse = await uut.execute({
      email: USER_EMAIL,
      name: USER_NAME,
      password: USER_PASSWORD,
    });

    expect(createUserResponse).toBeDefined();
    expect(createUserResponse.ok).toBe(true);
    expect(createUserResponse.error).toBeUndefined();
    expect(createUserResponse.user).toBeDefined();
    expect(createUserResponse.user.name).toEqual(USER_NAME);
  });
});
