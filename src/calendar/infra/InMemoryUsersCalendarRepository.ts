import { cloneDeep, find } from 'lodash';

import { IUsersCalendarRepository } from './interface/IUsersCalendarRepository';
import { UsersCalendar } from '../domain/UsersCalendar';
import { UserRole } from '../entity/UsersCalendar.entity';

export class InMemoryUsersCalendarRepository
  implements IUsersCalendarRepository {
  private items: UsersCalendar[] = [];

  async save(usersCalendar: UsersCalendar): Promise<UsersCalendar> {
    const clonedUsersCalendar = cloneDeep(usersCalendar);

    this.items.push(clonedUsersCalendar);

    return clonedUsersCalendar;
  }

  async findDefaultByUserId(userId: string): Promise<UsersCalendar> {
    return find(
      this.items,
      (item) => item.userId === userId && item.userRole === UserRole.CREATOR,
    );
  }
}
