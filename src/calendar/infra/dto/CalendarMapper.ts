import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CalendarEntity } from '../../entity/Calendar.entity';
import { Calendar } from '../../domain/Calendar';
import { CalendarInvitationCode } from '../../domain/CalendarInvitationCode';
import { CalendarName } from '../../domain/CalendarName';

export class CalendarMapper {
  static toDomain(entity: CalendarEntity): Calendar {
    return Calendar.create(
      {
        calendarName: CalendarName.create(entity.name).value,
        calendarOnlyOwn: entity.onlyOwn,
        calendarInvitationCode: CalendarInvitationCode.create(
          entity.invitationCode,
        ).value,
        createdAt: entity.createdAt,
      },
      new UniqueEntityId(entity.id),
    ).value;
  }
}
