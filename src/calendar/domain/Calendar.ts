import { Result } from '../../shared/core/Result';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { CalendarName } from './CalendarName';
import { CalendarInvitationCode } from './CalendarInvitationCode';

interface CalendarProps {
  calendarName: CalendarName;
  calendarOnlyOwn: boolean;
  calendarInvitationCode: CalendarInvitationCode;
  createdAt: Date;
}

interface CalendarNewProps {
  calendarName: CalendarName;
  calendarOnlyOwn: boolean;
  calendarInvitationCode: CalendarInvitationCode;
}

export class Calendar extends AggregateRoot<CalendarProps> {
  static create(props: CalendarProps, id?: UniqueEntityId): Result<Calendar> {
    return Result.ok(new Calendar(props, id));
  }

  static createNew(props: CalendarNewProps): Result<Calendar> {
    return Calendar.create({ ...props, createdAt: new Date() });
  }

  private constructor(props: CalendarProps, id: UniqueEntityId) {
    super(props, id);
  }

  get name(): CalendarName {
    return this.props.calendarName;
  }

  get invitationCode(): CalendarInvitationCode {
    return this.props.calendarInvitationCode;
  }

  get onlyOwn(): boolean {
    return this.props.calendarOnlyOwn;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
