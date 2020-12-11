import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { UserEntity } from '../../entity/User.entity';
import { IUserRepository } from '../interface/IUserRepository';
import { UserModelMapper } from '../dto/UserModelMapper';

export class MysqlUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    await this.userRepository.save(
      this.userRepository.create({
        id: user.id.toValue().toString(),
        email: user.email.value,
        name: user.name.value,
        password: user.password.value,
        createdAt: user.createdAt,
      }),
    );

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'name', 'password', 'createdAt'] },
    );

    if (!foundUser) {
      return undefined;
    }

    return UserModelMapper.toDomain(foundUser);
  }
}
