import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { TestAppManager } from './support/TestAppManager';
import { TestMysqlManager } from './support/TestMysqlManager';
import { TestUser } from './support/TestUser';

describe('UserModule (e2e)', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  const USER_NAME = '신영현_테스트';
  const MODIFY_NAME = '수정_테스트';
  const USER_EMAIL = 'den.shin.dev@gmail.com';
  const USER_PASSWORD = '123456789';
  const MODIFY_PWD = 'TESTTEST';
  const DUPLICATE_EMAIL_ERROR_MESSAGE = 'Request email was duplicated.';

  const loginQuery = (email: string, password: string) => {
    return {
      query: `mutation {
          login(input: {
            email: "${email}",
            password: "${password}"
          }) {
            ok
            error
            token
          }
        }`,
    };
  };

  let appManager: TestAppManager;
  let app: INestApplication;
  let user: TestUser;

  beforeEach(async () => {
    appManager = new TestAppManager();
    await appManager.init();
    app = appManager.app;
    user = new TestUser(app);
    const dbManager = new TestMysqlManager(app);
    await dbManager.clearDatabases();
  });

  afterEach(async () => {
    await appManager.deinit();
  });

  describe('CreateAccount', () => {
    const CREATE_QUERY = `mutation {
          createUser(input: {
            name: "${USER_NAME}",
            email: "${USER_EMAIL}",
            password: "${USER_PASSWORD}"
          }) {
            ok
            error
            user {
              id
              email
              name
            }
          }
        }`;

    it('정상 생성', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({ query: CREATE_QUERY })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { createUser },
            },
          } = response;
          expect(createUser.ok).toBe(true);
          expect(createUser.user.name).toEqual(USER_NAME);
          expect(createUser.user.email).toEqual(USER_EMAIL);
        });
    });

    it('중복된 이메일은 가입 실패', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({ query: CREATE_QUERY })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { createUser },
            },
          } = response;

          expect(createUser.ok).toBe(false);
          expect(createUser.error).toEqual(DUPLICATE_EMAIL_ERROR_MESSAGE);
          expect(createUser.user).toBeNull();
        });
    });
  });

  describe('find', () => {
    it('정상 find', async () => {
      const createdUser = await user.createUser(
        USER_NAME,
        USER_EMAIL,
        USER_PASSWORD,
      );

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `{
          find(input:{
            id: "${createdUser.id}",
          }) {
            ok
            user {
              id
              email
              name
            }
          }
        }`,
        })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { find },
            },
          } = response;

          expect(find.ok).toBe(true);
          expect(find.user.email).toBe(USER_EMAIL);
        });
    });

    it('없는 아이디로의 find 는 실패', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `{
          find(input:{
            id: "wrongId",
          }) {
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { find },
            },
          } = response;

          expect(find.ok).toBe(false);
          expect(find.error).toBe('Can`t found User.');
        });
    });
  });

  describe('Login', () => {
    it('정상 로그인', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send(loginQuery(USER_EMAIL, USER_PASSWORD))
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { login },
            },
          } = response;
          expect(login.ok).toBe(true);
          expect(login.token).toBeDefined();
        });
    });

    it('없는 아이디 로그인은 실패', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send(loginQuery('wrong@email.com', USER_PASSWORD))
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { login },
            },
          } = response;
          expect(login.ok).toBe(false);
          expect(login.token).toBeNull();
        });
    });

    it('틀린 비밀번호 로그인은 실패', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send(loginQuery(USER_EMAIL, 'wrongPwd'))
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { login },
            },
          } = response;
          expect(login.ok).toBe(false);
          expect(login.token).toBeNull();
        });
    });
  });

  describe('editUserProfile', () => {
    it('정상적으로 변경 요청이 이뤄졌는지', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);
      const logOnUser = await user.login(USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', logOnUser.token)
        .send({
          query: `
          mutation {
            editUserProfile(input: {
              name: "${MODIFY_NAME}",
              password: "${MODIFY_PWD}"
            }) {
              ok
              error
            }
          }
          `,
        })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { editUserProfile },
            },
          } = response;

          expect(editUserProfile.ok).toBe(true);
        });
    });

    it('변경된 비밀번호로 로그인 되는지', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);
      const logOnUser = await user.login(USER_EMAIL, USER_PASSWORD);
      await user.editProfile(logOnUser.token, MODIFY_NAME, MODIFY_PWD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send(loginQuery(USER_EMAIL, MODIFY_PWD))
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { login },
            },
          } = response;
          expect(login.ok).toBe(true);
          expect(login.token).toBeDefined();
        });
    });
  });
});
