import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { TestAppManager } from './support/TestAppManager';
import { TestMysqlManager } from './support/TestMysqlManager';
import { TestCalendar } from './support/TestCalendar';
import { TestUser } from './support/TestUser';

describe('CalendarModule (e2e)', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  const USER_NAME = '신영현_테스트';
  const USER_EMAIL = 'den.shin.dev@gmail.com';
  const USER_PASSWORD = '123456789';

  const createDefaultQuery = () => {
    return {
      query: `mutation {
        createDefaultCalendar {
          ok
          calendar {
            id
            name
          }
          error
        }
      }`,
    };
  };

  let appManager: TestAppManager;
  let app: INestApplication;
  let calendar: TestCalendar;
  let user: TestUser;

  beforeEach(async () => {
    appManager = new TestAppManager();
    await appManager.init();
    app = appManager.app;
    calendar = new TestCalendar(app);
    user = new TestUser(app);
    const dbManager = new TestMysqlManager(app);
    await dbManager.clearDatabases();
  });

  afterEach(async () => {
    await appManager.deinit();
  });

  describe('SaveDefault', () => {
    it('정상적으로 잘 이뤄지는지', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);
      const logOnUser = await user.login(USER_EMAIL, USER_PASSWORD);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', logOnUser.token)
        .send(createDefaultQuery())
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { createDefaultCalendar },
            },
          } = response;

          expect(createDefaultCalendar.ok).toBe(true);
          expect(createDefaultCalendar.calendar.name).toEqual(USER_NAME);
        });
    });

    it('중복 생성이 안되는지', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);
      const logOnUser = await user.login(USER_EMAIL, USER_PASSWORD);
      await calendar.createDefault(logOnUser.token);
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', logOnUser.token)
        .send(createDefaultQuery())
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { createDefaultCalendar },
            },
          } = response;

          expect(createDefaultCalendar.ok).toBe(false);
          expect(createDefaultCalendar.error).toEqual(
            'Already has Default Calendar.',
          );
        });
    });
  });
});
