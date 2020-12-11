import { mock, MockProxy } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';

import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { LoginUseCase } from './LoginUseCase';

describe('LoginUseCase', () => {
  let uut: LoginUseCase;
  let userRepository: MockProxy<IUserRepository>;
  let jwtService: JwtService;

  const TEST_EMAIL = 'shindevil1@naver.com';
  const TEST_PASSWORD = '12345678';
  const TEST_PASSWORD_HASHED =
    '$2b$10$IJ0LdlcFUuehDmfT.Ke2sO3cEYAWsAXH1CC9CfNnzGUJ5Y5f8iB22';

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    jwtService = mock<JwtService>();
    uut = new LoginUseCase(userRepository, jwtService);
  });

  function givenFoundUserThatJoinedNaverMail() {
    userRepository.findByEmail
      .calledWith('shindevil1@naver.com')
      .mockResolvedValue(
        User.createNew({
          userEmail: UserEmail.create(TEST_EMAIL).value,
          userName: UserName.create('SBCD').value,
          userPassword: UserPassword.create(TEST_PASSWORD_HASHED).value,
        }).value,
      );
  }

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('email 과 password 가 모두 일치 해 정상적으로 로그인 되는지', async () => {
    givenFoundUserThatJoinedNaverMail();

    const logon = await uut.execute({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    expect(logon.ok).toBe(true);
  });

  it('email 이 잘못 된 경우 로그인 되지 않는지', async () => {
    const WRONG_EMAIL = 'wrong@email.com';

    givenFoundUserThatJoinedNaverMail();

    const logon = await uut.execute({
      email: WRONG_EMAIL,
      password: TEST_PASSWORD,
    });

    expect(logon.ok).toBe(false);
    expect(logon.error).toBe(
      `Can not found user of trial email : ${WRONG_EMAIL}`,
    );
  });

  it('password 가 잘못 된 경우 로그인 되지 않는지', async () => {
    givenFoundUserThatJoinedNaverMail();

    const logon = await uut.execute({
      email: TEST_EMAIL,
      password: 'wrongPwd',
    });

    expect(logon.ok).toBe(false);
    expect(logon.error).toBe('Password is Wrong');
  });
});
