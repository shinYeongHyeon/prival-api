import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { UserEntity } from '../../entity/User.entity';
import { IUserRepository } from '../interface/IUserRepository';
import { UserModelMapper } from './UserModelMapper';

export class MysqlUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    await this.userRepository.save(UserModelMapper.toPersistence(user));

    return user;
  }
}
