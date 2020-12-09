import { Result } from '../../shared/core/Result';
import { UserName } from './UserName';

describe('UserName', () => {
  const USER_NAME = '신영현';
  const USER_NAME_EMPTY_ERROR_MESSAGE = 'UserName should not be empty.';

  let userNameOrError: Result<UserName>;

  it('UserName String 으로 UserName 생성', () => {
    userNameOrError = UserName.create(USER_NAME);

    expect(userNameOrError.isSuccess).toBe(true);
  });

  it('UserName String 은 빈 값일 수 없습니다', () => {
    userNameOrError = UserName.create('');

    expect(userNameOrError.isSuccess).toBe(false);
    expect(userNameOrError.errorValue()).toEqual(USER_NAME_EMPTY_ERROR_MESSAGE);
  });

  it('UserName String 은 null 이나 undefined 일 수 없습니다', () => {
    userNameOrError = UserName.create(null);
    const userNameOrErrorOfUndefined = UserName.create(undefined);

    expect(userNameOrError.isSuccess).toBe(false);
    expect(userNameOrErrorOfUndefined.isSuccess).toBe(false);
    expect(userNameOrError.errorValue()).toEqual(USER_NAME_EMPTY_ERROR_MESSAGE);
    expect(userNameOrErrorOfUndefined.errorValue()).toEqual(
      USER_NAME_EMPTY_ERROR_MESSAGE,
    );
  });
});
