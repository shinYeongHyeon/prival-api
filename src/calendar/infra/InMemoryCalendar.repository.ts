import { cloneDeep } from 'lodash';

import { ICalendarRepository } from './interface/ICalendarRepository';
import { Calendar } from '../domain/Calendar';

export class InMemoryCalendarRepository implements ICalendarRepository {
  private calendars: Calendar[] = [];

  saveDefault(calendar: Calendar): Promise<Calendar> {
    const clonedCalendar = cloneDeep(calendar);

    this.calendars.push(clonedCalendar);

    return clonedCalendar;
  }
}
