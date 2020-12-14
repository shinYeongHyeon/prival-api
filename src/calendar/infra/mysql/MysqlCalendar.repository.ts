import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ICalendarRepository } from '../interface/ICalendarRepository';
import { Calendar } from '../../domain/Calendar';
import { CalendarEntity } from '../../entity/Calendar.entity';

export class MysqlCalendarRepository implements ICalendarRepository {
  constructor(
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  async saveDefault(calendar: Calendar): Promise<Calendar> {
    await this.calendarRepository.save({
      id: calendar.id.toValue().toString(),
      name: calendar.name.value,
      onlyOwn: calendar.onlyOwn,
      calendar: calendar.invitationCode.value,
      createdAt: calendar.createdAt,
    });

    return calendar;
  }
}
