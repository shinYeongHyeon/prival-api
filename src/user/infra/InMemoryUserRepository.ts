import { cloneDeep, find, findIndex } from 'lodash';

import { IUserRepository } from './interface/IUserRepository';
import { User } from '../domain/User';

export class InMemoryUserRepository implements IUserRepository {
  private items: User[] = [];

  async save(user: User): Promise<User> {
    const clonedUser = cloneDeep(user);
    // const foundIndex = findIndex(this.items, (item) => item.isEqual(user));

    this.items.push(clonedUser);

    return clonedUser;
  }

  async findByEmail(email: string): Promise<User> {
    return find(this.items, (item) => item.email.value === email);
  }
}
