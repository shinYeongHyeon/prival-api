import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../../src/user/entity/User.entity';
import { CalendarEntity } from '../../src/calendar/entity/Calendar.entity';
import { UsersCalendarEntity } from '../../src/calendar/entity/UsersCalendar.entity';
import { ScheduleEntity } from '../../src/schedule/entity/Schedule.entity';

export class TestMysqlManager {
  constructor(private readonly app: INestApplication) {}

  async clearDatabases(): Promise<void> {
    const userRepository = this.app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    const calendarRepository = this.app.get<Repository<CalendarEntity>>(
      getRepositoryToken(CalendarEntity),
    );
    const usersCalendarRepository = this.app.get<
      Repository<UsersCalendarEntity>
    >(getRepositoryToken(UsersCalendarEntity));
    const scheduleRepository = this.app.get<Repository<ScheduleEntity>>(
      getRepositoryToken(ScheduleEntity),
    );

    await Promise.all([
      userRepository.delete({}),
      calendarRepository.delete({}),
      usersCalendarRepository.delete({}),
      scheduleRepository.delete({}),
    ]);
  }
}
