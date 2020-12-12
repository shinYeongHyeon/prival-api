import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

const GRAPHQL_ENDPOINT = '/graphql';

describe('UserModule (e2e)', () => {
  const USER_NAME = '신영현_테스트';
  const USER_EMAIL = 'den.shin.dev@gmail.com';
  const USER_PASSWORD = '123456789';
  const DUPLICATE_EMAIL_ERROR_MESSAGE = 'Request email was duplicated.';

  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    await app.close();
  });

  describe('CreateAccount', () => {
    it('정상 생성', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          createUser(input: {
            name: "${USER_NAME}",
            email: "${USER_EMAIL}",
            password: "${USER_PASSWORD}"
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
              data: { createUser },
            },
          } = response;
          expect(createUser.ok).toBe(true);
          expect(createUser.user.name).toEqual(USER_NAME);
          expect(createUser.user.email).toEqual(USER_EMAIL);

          createdId = createUser.user.id;
        });
    });

    it('중복된 이메일은 가입 실패', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
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
        }`,
        })
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
    it('정상 find', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `{
          find(input:{
            id: "${createdId}",
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
    it('정상 로그인', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          login(input: {
            email: "${USER_EMAIL}",
            password: "${USER_PASSWORD}"
          }) {
            ok
            error
            token
          }
        }`,
        })
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

    it('없는 아이디 로그인은 실패', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          login(input: {
            email: "wrong@email.com",
            password: "${USER_PASSWORD}"
          }) {
            ok
            error
            token
          }
        }`,
        })
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

    it('틀린 비밀번호 로그인은 실패', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation {
          login(input: {
            email: "${USER_EMAIL}",
            password: "wrongPwd"
          }) {
            ok
            error
            token
          }
        }`,
        })
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
});
