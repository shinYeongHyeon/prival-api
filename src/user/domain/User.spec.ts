import { Result } from '../../shared/core/Result';
import { UserName } from './UserName';
import { User } from './User';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

describe('User', () => {
  const USER_NAME = '신영현';
  const USER_EMAIL = 'dev.den.shin@gmail.com';
  const USER_PASSWORD = '123456';

  let userOrError: Result<User>;
  let userName: UserName;
  let userEmail: UserEmail;
  let userPassword: UserPassword;

  beforeEach(() => {
    userName = UserName.create(USER_NAME).value;
    userEmail = UserEmail.create(USER_EMAIL).value;
    userPassword = UserPassword.create(USER_PASSWORD).value;

    userOrError = User.createNew({
      userName,
      userEmail,
      userPassword,
    });
  });

  it('생성되었는지', () => {
    expect(userOrError.isSuccess).toBe(true);
  });

  it('getter 들이 정상작동하는지', () => {
    const createdAt = userOrError.value.createdAt;
    const now = new Date();

    expect(userOrError.value.name).toEqual(userName);
    expect(userOrError.value.name.value).toEqual(USER_NAME);
    expect(userOrError.value.email).toEqual(userEmail);
    expect(userOrError.value.email.value).toEqual(USER_EMAIL);
    expect(
      `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`,
    ).toEqual(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
    expect(userOrError.value.password).toEqual(userPassword);
    expect(userOrError.value.password.value).toEqual(USER_PASSWORD);
  });
});
