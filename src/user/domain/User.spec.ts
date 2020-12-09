import { Result } from '../../shared/core/Result';
import { UserName } from './UserName';
import { User } from './User';

describe('User', () => {
  const USER_NAME = '신영현';

  let userOrError: Result<User>;
  let userName: UserName;

  beforeAll(() => {
    userName = UserName.create(USER_NAME).value;
    userOrError = User.createNew({
      userName,
    });
  });

  it('생성되었는지', () => {
    expect(userOrError.isSuccess).toBe(true);
  });

  it('getter 들이 정상작동하는지', () => {
    expect(userOrError.value.name).toEqual(userName);
    expect(userOrError.value.name.props.value).toEqual(USER_NAME);
  });
});
