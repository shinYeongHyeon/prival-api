import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ICalendarRepository } from '../interface/ICalendarRepository';
import { Calendar } from '../../domain/Calendar';
import { CalendarEntity } from '../../entity/Calendar.entity';
import { CalendarMapper } from '../dto/CalendarMapper';

export class MysqlCalendarRepository implements ICalendarRepository {
  constructor(
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  async save(calendar: Calendar): Promise<Calendar> {
    await this.calendarRepository.save({
      id: calendar.id.toValue().toString(),
      name: calendar.name.value,
      onlyOwn: calendar.onlyOwn,
      invitationCode: calendar.invitationCode.value,
      createdAt: calendar.createdAt,
    });

    return calendar;
  }

  async find(calendarId: string): Promise<Calendar> {
    const foundCalendar = await this.calendarRepository.findOne(calendarId);

    if (!foundCalendar) {
      return undefined;
    }

    return CalendarMapper.toDomain(foundCalendar);
  }
}
