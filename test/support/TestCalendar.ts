import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { CreateDefaultCalendarResponse } from '../../src/calendar/application/CreateDefaultCalendar/dto/CreateDefaultCalendar.dto';
import { CalendarEntity } from '../../src/calendar/entity/Calendar.entity';

export class TestCalendar {
  private GRAPHQL_ENDPOINT = '/graphql';
  private app: INestApplication;
  private server: any;

  constructor(app: INestApplication) {
    this.app = app;
    this.server = app.getHttpServer();
  }

  async createDefault(token: string): Promise<CalendarEntity> {
    let calendarResponse: CalendarEntity;

    await request(this.server)
      .post(this.GRAPHQL_ENDPOINT)
      .set('X-JWT', token)
      .send({
        query: `
          mutation {
            createDefaultCalendar {
              ok
              calendar {
                id
                name
              }
              error
            }
          }`,
      })
      .expect((response) => {
        const {
          body: {
            data: { createDefaultCalendar },
          },
        } = response;

        calendarResponse = createDefaultCalendar.calendar;
      });

    return calendarResponse;
  }
}
