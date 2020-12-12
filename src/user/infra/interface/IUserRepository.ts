import { User } from '../../domain/User';

export interface IUserRepository {
  save(user: User): Promise<User>;

  findByEmail(email: string): Promise<User> | undefined;

  find(id: string): Promise<User> | undefined;
}
