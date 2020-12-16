import { cloneDeep } from 'lodash';

import { IScheduleRepository } from './interface/IScheduleRepository';
import { Schedule } from '../domain/Schedule';

export class InMemoryScheduleRepository implements IScheduleRepository {
  private items: Schedule[] = [];

  async save(schedule: Schedule): Promise<Schedule> {
    const clonedCalendar = cloneDeep(schedule);

    this.items.push(clonedCalendar);

    return clonedCalendar;
  }
}
