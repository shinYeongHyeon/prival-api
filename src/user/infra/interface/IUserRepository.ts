import { User } from '../../domain/User';

export interface IUserRepository {
  save(user: User, password: string): Promise<User>;
}
