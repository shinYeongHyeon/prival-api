import { Result } from '../../shared/core/Result';
import { UserEmail } from './UserEmail';

describe('UserEmail', () => {
  const USER_EMAIL = 'dev.den.shin@gmail.com';
  const USER_EMAIL_EMPTY_ERROR_MESSAGE = 'userEmailString should not be empty.';

  let userEmailOrError: Result<UserEmail>;

  beforeAll(() => {
    userEmailOrError = UserEmail.create(USER_EMAIL);
  });

  it('생성되는지', () => {
    expect(userEmailOrError.isSuccess).toBe(true);
  });

  it('UserEmail String 은 빈 값일 수 없습니다', () => {
    userEmailOrError = UserEmail.create('');

    expect(userEmailOrError.isSuccess).toBe(false);
    expect(userEmailOrError.errorValue()).toEqual(
      USER_EMAIL_EMPTY_ERROR_MESSAGE,
    );
  });

  it('UserEmail String 은 null 이나 undefined 일 수 없습니다', () => {
    userEmailOrError = UserEmail.create(null);
    const userEmailOrErrorOfUndefined = UserEmail.create(undefined);

    expect(userEmailOrError.isSuccess).toBe(false);
    expect(userEmailOrErrorOfUndefined.isSuccess).toBe(false);
    expect(userEmailOrError.errorValue()).toEqual(
      USER_EMAIL_EMPTY_ERROR_MESSAGE,
    );
    expect(userEmailOrErrorOfUndefined.errorValue()).toEqual(
      USER_EMAIL_EMPTY_ERROR_MESSAGE,
    );
  });
});
