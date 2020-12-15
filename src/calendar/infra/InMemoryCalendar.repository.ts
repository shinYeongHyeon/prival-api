import { cloneDeep, find } from 'lodash';

import { ICalendarRepository } from './interface/ICalendarRepository';
import { Calendar } from '../domain/Calendar';
import { UserRole } from '../entity/UsersCalendar.entity';

export class InMemoryCalendarRepository implements ICalendarRepository {
  private items: Calendar[] = [];

  save(calendar: Calendar): Promise<Calendar> {
    const clonedCalendar = cloneDeep(calendar);

    this.items.push(clonedCalendar);

    return clonedCalendar;
  }

  find(calendarId: string): Promise<Calendar> {
    return find(
      this.items,
      (item) => item.id.toValue().toString() === calendarId,
    );
  }
}
