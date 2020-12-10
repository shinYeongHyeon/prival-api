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

  beforeEach(async () => {
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
