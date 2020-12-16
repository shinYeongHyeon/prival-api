import { Result } from '../../shared/core/Result';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { ScheduleDateTime } from './ScheduleDateTime';
import { ScheduleTitle } from './ScheduleTitle';
import { ScheduleDescription } from './ScheduleDescription';

interface ScheduleProps {
  start: ScheduleDateTime;
  end: ScheduleDateTime;
  onlyDate: boolean;
  title: ScheduleTitle;
  description: ScheduleDescription;
  calendarId: string;
  createdAt: Date;
}

interface ScheduleNewProps {
  start: ScheduleDateTime;
  end: ScheduleDateTime;
  onlyDate: boolean;
  title: ScheduleTitle;
  description: ScheduleDescription;
  calendarId: string;
}

export class Schedule extends AggregateRoot<ScheduleProps> {
  static create(props: ScheduleProps, id?: UniqueEntityId): Result<Schedule> {
    if (props.end.value < props.start.value) {
      return Result.fail('end must be bigger than start.');
    }

    return Result.ok(new Schedule(props, id));
  }

  static createNew(props: ScheduleNewProps): Result<Schedule> {
    return Schedule.create({ ...props, createdAt: new Date() });
  }

  private constructor(props: ScheduleProps, id: UniqueEntityId) {
    super(props, id);
  }

  get start(): ScheduleDateTime {
    return this.props.start;
  }

  get end(): ScheduleDateTime {
    return this.props.end;
  }

  get onlyDate(): boolean {
    return this.props.onlyDate;
  }

  get title(): ScheduleTitle {
    return this.props.title;
  }

  get description(): ScheduleDescription {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get calendarId(): string {
    return this.props.calendarId;
  }
}
