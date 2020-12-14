import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../../src/user/entity/User.entity';

export class TestMysqlManager {
  constructor(private readonly app: INestApplication) {}

  async clearDatabases(): Promise<void> {
    const userRepository = this.app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    await Promise.all([userRepository.delete({})]);
  }
}
