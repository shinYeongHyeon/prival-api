import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Schedule } from '../../domain/Schedule';
import { IScheduleRepository } from '../interface/IScheduleRepository';
import { ScheduleEntity } from '../../entity/Schedule.entity';
import { CalendarEntity } from '../../../calendar/entity/Calendar.entity';

export class MysqlScheduleRepository implements IScheduleRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  async save(schedule: Schedule): Promise<Schedule> {
    const savedResult = await this.scheduleRepository.save({
      id: schedule.id.toValue().toString(),
      start: schedule.start.value,
      end: schedule.end.value,
      onlyDate: schedule.onlyDate,
      title: schedule.title.value,
      description: schedule.description.value,
      createdAt: schedule.createdAt,
      calendar: await this.calendarRepository.findOne(schedule.calendarId),
    });

    return schedule;
  }
}
