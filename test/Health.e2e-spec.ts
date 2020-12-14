import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { TestAppManager } from './support/TestAppManager';
import { TestMysqlManager } from './support/TestMysqlManager';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Health (e2e)', () => {
  let appManager: TestAppManager;
  let app: INestApplication;

  beforeEach(async () => {
    appManager = new TestAppManager();
    await appManager.init();
    app = appManager.app;

    const dbManager = new TestMysqlManager(app);
    await dbManager.clearDatabases();
  });

  afterEach(async () => {
    await appManager.deinit();
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
