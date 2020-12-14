import { Result } from '../../shared/core/Result';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { UserRole } from '../entity/UsersCalendar.entity';

export interface UsersCalendarProps {
  userId: string;
  calendarId: string;
  userRole: UserRole;
  createdAt: Date;
}

export interface UsersCalendarNewProps {
  userId: string;
  calendarId: string;
  userRole: UserRole;
}

export class UsersCalendar extends AggregateRoot<UsersCalendarProps> {
  static create(
    props: UsersCalendarProps,
    id?: UniqueEntityId,
  ): Result<UsersCalendar> {
    return Result.ok(new UsersCalendar(props, id));
  }

  static createNew(props: UsersCalendarNewProps): Result<UsersCalendar> {
    return UsersCalendar.create({ ...props, createdAt: new Date() });
  }

  private constructor(props: UsersCalendarProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get calendarId(): string {
    return this.props.calendarId;
  }

  get userRole(): UserRole {
    return this.props.userRole;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
