import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  const USER_NAME = '신영현';

  let uut: CreateUserUseCase;

  beforeEach(() => {
    uut = new CreateUserUseCase();
  });

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('유저 Create', () => {
    const createUserResponse = uut.execute({
      name: USER_NAME,
    });

    expect(createUserResponse).toBeDefined();
    expect(createUserResponse.ok).toBe(true);
    expect(createUserResponse.error).toBeUndefined();
    expect(createUserResponse.user).toBeDefined();
    expect(createUserResponse.user.name).toEqual(USER_NAME);
  });
});
