import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';

export class TestAppManager {
  private _app?: INestApplication;

  get app() {
    if (!this._app) {
      throw new Error('App should be created: call "init"');
    }

    return this._app;
  }

  async init(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this._app = moduleFixture.createNestApplication();
    await this._app.init();
  }

  async deinit(): Promise<void> {
    if (this._app) {
      await this._app.close();
      this._app = undefined;
    }
  }
}
