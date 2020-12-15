import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UsersCalendarEntity } from '../../entity/UsersCalendar.entity';
import { UsersCalendar } from '../../domain/UsersCalendar';

export class UsersCalendarMapper {
  static toDomain(entity: UsersCalendarEntity): UsersCalendar {
    return UsersCalendar.create(
      {
        calendarId: entity.calendar.id,
        createdAt: entity.createdAt,
        userId: entity.user.id,
        userRole: entity.userRole,
      },
      new UniqueEntityId(entity.id),
    ).value;
  }
}
