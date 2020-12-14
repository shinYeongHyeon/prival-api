import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { CreateUserDto } from '../../src/user/application/CreateUser/dto/CreateUser.dto';
import { LoginResponse } from '../../src/user/application/Login/dto/Login.dto';

export class TestUser {
  private GRAPHQL_ENDPOINT = '/graphql';
  private app: INestApplication;
  private server: any;

  constructor(app: INestApplication) {
    this.app = app;
    this.server = app.getHttpServer();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<CreateUserDto> {
    let createdUser: CreateUserDto;

    await request(this.server)
      .post(this.GRAPHQL_ENDPOINT)
      .send({
        query: `mutation {
          createUser(input: {
            name: "${name}",
            email: "${email}",
            password: "${password}"
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
      .expect((response) => {
        const {
          body: {
            data: { createUser },
          },
        } = response;

        createdUser = createUser.user;
      });

    return createdUser;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    let logOn: LoginResponse;

    await request(this.server)
      .post(this.GRAPHQL_ENDPOINT)
      .send({
        query: `mutation {
          login(input: {
            email: "${email}",
            password: "${password}"
          }) {
            ok
            error
            token
          }
        }`,
      })
      .expect((response) => {
        const {
          body: {
            data: { login },
          },
        } = response;

        logOn = login;
      });

    return logOn;
  }

  async editProfile(
    token: string,
    name: string,
    password: string,
  ): Promise<void> {
    await request(this.server)
      .post(this.GRAPHQL_ENDPOINT)
      .set('X-JWT', token)
      .send({
        query: `
          mutation {
            editUserProfile(input: {
              name: "${name}",
              password: "${password}"
            }) {
              ok
              error
            }
          }
          `,
      });
  }
}
