import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IUsersCalendarRepository } from '../interface/IUsersCalendarRepository';
import { UsersCalendar } from '../../domain/UsersCalendar';
import {
  UserRole,
  UsersCalendarEntity,
} from '../../entity/UsersCalendar.entity';
import { CalendarEntity } from '../../entity/Calendar.entity';
import { UserEntity } from '../../../user/entity/User.entity';
import { UsersCalendarMapper } from '../dto/UsersCalendarMapper';

export class MySqlUsersCalendarRepository implements IUsersCalendarRepository {
  constructor(
    @InjectRepository(UsersCalendarEntity)
    private readonly usersCalendarRepository: Repository<UsersCalendarEntity>,
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(usersCalendar: UsersCalendar): Promise<UsersCalendar> {
    await this.usersCalendarRepository.save({
      id: usersCalendar.id.toValue().toString(),
      userRole: usersCalendar.userRole,
      createdAt: usersCalendar.createdAt,
      user: await this.userRepository.findOne(usersCalendar.userId),
      calendar: await this.calendarRepository.findOne(usersCalendar.calendarId),
    });

    return usersCalendar;
  }

  async findDefaultByUserId(
    userId: string,
  ): Promise<UsersCalendar> | undefined {
    const user = await this.userRepository.findOne(userId);
    const foundUsersCalendar = await this.usersCalendarRepository.findOne(
      {
        user,
        userRole: UserRole.CREATOR,
      },
      {
        relations: ['user', 'calendar'],
      },
    );

    if (!foundUsersCalendar) {
      return undefined;
    }

    return UsersCalendarMapper.toDomain(foundUsersCalendar);
  }
}
