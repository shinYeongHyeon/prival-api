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

  let app: INestApplication;

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
    it('CreateAccount', () => {
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
