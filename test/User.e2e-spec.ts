import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

const GRAPHQL_ENDPOINT = '/graphql';

describe('UserModule (e2e)', () => {
  const USER_NAME = '신영현_테스트';

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
          name: "${USER_NAME}"
        }) {
          ok
          user {
            id
            name
            createdAt
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
      });
  });
});
