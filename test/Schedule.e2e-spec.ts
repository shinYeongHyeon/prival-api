import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { TestAppManager } from './support/TestAppManager';
import { TestCalendar } from './support/TestCalendar';
import { TestUser } from './support/TestUser';
import { TestMysqlManager } from './support/TestMysqlManager';

describe('ScheduleModule (e2e)', () => {
  const GRAPHQL_ENDPOINT = '/graphql';
  const USER_NAME = '신영현_테스트';
  const USER_EMAIL = 'den.shin.dev@gmail.com';
  const USER_PASSWORD = '123456789';
  const SCHEDULE_TITLE = '일정';
  const SCHEDULE_DESCRIPTION = '세부사항';
  const START = '2020-10-01 10:00:00';
  const END = '2020-10-02 10:00:00';
  const ONLY_DATE = false;

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

  describe('createSchedule', () => {
    it('정상적으로 잘 이뤄지는지', async () => {
      await user.createUser(USER_NAME, USER_EMAIL, USER_PASSWORD);
      const logOnUser = await user.login(USER_EMAIL, USER_PASSWORD);
      const calendarEntity = await calendar.createDefault(logOnUser.token);

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', logOnUser.token)
        .send({
          query: `
          mutation {
            createSchedule(input: {
              title: "${SCHEDULE_TITLE}",
              onlyDate: ${ONLY_DATE},
              description: "${SCHEDULE_DESCRIPTION}",
              calendarId: "${calendarEntity.id}",
              start: "${START}",
              end: "${END}"
            }) {
              ok
              error
              schedule {
                id
                start
                end
                onlyDate
                title
                description
              }
            }
          }`,
        })
        .expect(200)
        .expect((response) => {
          const {
            body: {
              data: { createSchedule },
            },
          } = response;

          expect(createSchedule.ok).toBe(true);
          expect(new Date(createSchedule.schedule.start)).toEqual(
            new Date(START),
          );
        });
    });
  });
});
