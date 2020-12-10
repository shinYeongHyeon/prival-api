import { Result } from '../../shared/core/Result';
import { UserName } from './UserName';
import { User } from './User';
import { UserEmail } from './UserEmail';

describe('User', () => {
  const USER_NAME = '신영현';
  const USER_EMAIL = 'dev.den.shin@gmail.com';

  let userOrError: Result<User>;
  let userName: UserName;
  let userEmail: UserEmail;

  beforeAll(() => {
    userName = UserName.create(USER_NAME).value;
    userEmail = UserEmail.create(USER_EMAIL).value;
    userOrError = User.createNew({
      userName,
      userEmail,
    });
  });

  it('생성되었는지', () => {
    expect(userOrError.isSuccess).toBe(true);
  });

  it('getter 들이 정상작동하는지', () => {
    expect(userOrError.value.name).toEqual(userName);
    expect(userOrError.value.name.value).toEqual(USER_NAME);
    expect(userOrError.value.email).toEqual(userEmail);
    expect(userOrError.value.email.value).toEqual(USER_EMAIL);
  });
});
