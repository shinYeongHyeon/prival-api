import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from '../../shared/enitity/Core.entity';
import { CalendarEntity } from '../../calendar/entity/Calendar.entity';
import { User } from '../domain/User';

enum UserRole {
  CREATOR = 'CREATOR',
  PARTICIPANT = 'PARTICIPANT',
}

@Entity({ name: 'usersCalendar' })
export class UsersCalendarEntity extends CoreEntity {
  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  calendar: CalendarEntity;

  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARTICIPANT,
  })
  userRole: UserRole;
}
