import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalendarEntity } from './entity/Calendar.entity';
import { MysqlCalendarRepository } from './infra/mysql/MysqlCalendar.repository';
import { CreateDefaultCalendarUseCase } from './application/CreateDefaultCalendar/CreateDefaultCalendarUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  providers: [
    CreateDefaultCalendarUseCase,
    {
      provide: 'CALENDAR_REPOSITORY',
      useClass: MysqlCalendarRepository,
    },
  ],
})
export class CalendarModule {}
