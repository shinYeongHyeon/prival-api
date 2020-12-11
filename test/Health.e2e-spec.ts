import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('HealthCheck', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        query: `{
        healthCheck
      }`,
      })
      .expect(200)
      .expect((response) => {
        const {
          body: { data },
        } = response;

        expect(data.healthCheck).toBe(true);
      });
  });
});
