import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateDefaultCalendarUseCase } from './application/CreateDefaultCalendar/CreateDefaultCalendarUseCase';
import { JoinCalendarUseCase } from './application/JoinCalendar/JoinCalendarUseCase';
import { CreateInvitationCodeUseCase } from './application/CreateInvitationCode/CreateInvitationCodeUseCase';
import { MySqlUsersCalendarRepository } from './infra/mysql/MySqlUsersCalendar.repository';
import { MysqlUserRepository } from '../user/infra/mysql/MysqlUser.repository';
import { MysqlCalendarRepository } from './infra/mysql/MysqlCalendar.repository';
import { CalendarEntity } from './entity/Calendar.entity';
import { UserEntity } from '../user/entity/User.entity';
import { UsersCalendarEntity } from './entity/UsersCalendar.entity';
import { CalendarResolver } from './resolver/Calendar.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CalendarEntity, UsersCalendarEntity]),
  ],
  providers: [
    CreateDefaultCalendarUseCase,
    JoinCalendarUseCase,
    CreateInvitationCodeUseCase,
    CalendarResolver,
    {
      provide: 'CALENDAR_REPOSITORY',
      useClass: MysqlCalendarRepository,
    },
    {
      provide: 'USERS_CALENDAR_REPOSITORY',
      useClass: MySqlUsersCalendarRepository,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: MysqlUserRepository,
    },
  ],
})
export class CalendarModule {}
