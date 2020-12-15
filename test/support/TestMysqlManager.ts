import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../../src/user/entity/User.entity';
import { CalendarEntity } from '../../src/calendar/entity/Calendar.entity';
import { UsersCalendarEntity } from '../../src/calendar/entity/UsersCalendar.entity';

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

    await Promise.all([
      userRepository.delete({}),
      calendarRepository.delete({}),
      usersCalendarRepository.delete({}),
    ]);
  }
}
