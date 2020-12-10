import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { UserEntity } from '../../entity/User.entity';
import { IUserRepository } from '../interface/IUserRepository';

export class MysqlUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User, password: string): Promise<User> {
    await this.userRepository.save(
      this.userRepository.create({
        id: user.id.toValue().toString(),
        email: user.email.value,
        name: user.name.value,
        password,
        createdAt: user.createdAt,
      }),
    );

    return user;
  }
}
