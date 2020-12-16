import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleEntity } from './entity/Schedule.entity';
import { ScheduleResolver } from './resolver/Schedule.resolver';
import { MysqlScheduleRepository } from './infra/mysql/MysqlScheduleRepository';
import { CalendarEntity } from '../calendar/entity/Calendar.entity';
import { CreateScheduleUseCase } from './application/CreateSchedule/CreateScheduleUseCase';
import { MysqlCalendarRepository } from '../calendar/infra/mysql/MysqlCalendar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, CalendarEntity])],
  providers: [
    CreateScheduleUseCase,
    ScheduleResolver,
    {
      provide: 'SCHEDULE_REPOSITORY',
      useClass: MysqlScheduleRepository,
    },
    {
      provide: 'CALENDAR_REPOSITORY',
      useClass: MysqlCalendarRepository,
    },
  ],
})
export class ScheduleModule {}
