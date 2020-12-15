import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export class TestCalendar {
  private GRAPHQL_ENDPOINT = '/graphql';
  private app: INestApplication;
  private server: any;

  constructor(app: INestApplication) {
    this.app = app;
    this.server = app.getHttpServer();
  }

  async createDefault(token: string): Promise<void> {
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
      });
  }
}
