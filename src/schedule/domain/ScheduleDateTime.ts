import { isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface ScheduleDateTimeProps {
  value: Date;
}

export class ScheduleDateTime extends ValueObject<ScheduleDateTimeProps> {
  static create(scheduleDateTime: Date): Result<ScheduleDateTime> {
    if (isNil(scheduleDateTime)) {
      return Result.fail('Date should be Defined');
    }

    return Result.ok(new ScheduleDateTime({ value: scheduleDateTime }));
  }

  private constructor(props: ScheduleDateTimeProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }
}
