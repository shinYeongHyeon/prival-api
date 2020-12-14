import { cloneDeep } from 'lodash';

import { IUsersCalendarRepository } from './interface/IUsersCalendarRepository';
import { UsersCalendar } from '../domain/UsersCalendar';

export class InMemoryUsersCalendarRepository
  implements IUsersCalendarRepository {
  private items: UsersCalendar[] = [];

  async save(usersCalendar: UsersCalendar): Promise<UsersCalendar> {
    const clonedUsersCalendar = cloneDeep(usersCalendar);

    this.items.push(clonedUsersCalendar);

    return clonedUsersCalendar;
  }
}
