import { INestApplication } from '@nestjs/common';

export class TestCalendar {
  private app: INestApplication;
  private server: any;

  constructor(app: INestApplication) {
    this.app = app;
    this.server = app.getHttpServer();
  }
}
