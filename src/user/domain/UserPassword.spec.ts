import { Result } from '../../shared/core/Result';
import { UserPassword } from './UserPassword';

describe('UserPassword', () => {
  const PASSWORD = '123456';
  const USER_PASSWORD_EMPTY_ERROR_MESSAGE = 'UserPasswordString should not be empty.';
  const MIN_LENGTH = 6;

  let userPasswordOrError: Result<UserPassword>;

  it('생성되었는지', () => {
    userPasswordOrError = UserPassword.create(PASSWORD);

    expect(userPasswordOrError).toBeDefined();
  });

  it('UserPassword String 은 빈 값일 수 없습니다', () => {
    userPasswordOrError = UserPassword.create('');

    expect(userPasswordOrError.isSuccess).toBe(false);
    expect(userPasswordOrError.errorValue()).toEqual(
      USER_PASSWORD_EMPTY_ERROR_MESSAGE,
    );
  });

  it('UserPassword String 은 null 이나 undefined 일 수 없습니다', () => {
    userPasswordOrError = UserPassword.create(null);
    const userPasswordOrErrorOfUndefined = UserPassword.create(undefined);

    expect(userPasswordOrError.isSuccess).toBe(false);
    expect(userPasswordOrErrorOfUndefined.isSuccess).toBe(false);
    expect(userPasswordOrError.errorValue()).toEqual(
      USER_PASSWORD_EMPTY_ERROR_MESSAGE,
    );
    expect(userPasswordOrErrorOfUndefined.errorValue()).toEqual(
      USER_PASSWORD_EMPTY_ERROR_MESSAGE,
    );
  });

  it('UserPassword String 은 최소길이를 넘기지 않을 경우엔 생성이 불가합니다.', () => {
    userPasswordOrError = UserPassword.create('12345');

    expect(userPasswordOrError.isSuccess).toBe(false);
    expect(userPasswordOrError.errorValue()).toEqual(
      'UserPasswordString should be longer than ' + MIN_LENGTH,
    );
  });
});
