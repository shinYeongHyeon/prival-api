import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalendarEntity } from './entity/Calendar.entity';
import { MysqlCalendarRepository } from './infra/mysql/MysqlCalendar.repository';
import { CreateDefaultCalendarUseCase } from './application/CreateDefaultCalendar/CreateDefaultCalendarUseCase';
import { CalendarResolver } from './resolver/Calendar.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  providers: [
    CreateDefaultCalendarUseCase,
    CalendarResolver,
    {
      provide: 'CALENDAR_REPOSITORY',
      useClass: MysqlCalendarRepository,
    },
  ],
})
export class CalendarModule {}
