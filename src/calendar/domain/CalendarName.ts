import { isEmpty } from 'lodash';

import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

interface CalendarNameProps {
  value: string;
}

export class CalendarName extends ValueObject<CalendarNameProps> {
  static create(calendarNameString: string): Result<CalendarName> {
    if (isEmpty(calendarNameString)) {
      return Result.fail('Calendar Name is Not Empty.');
    }

    return Result.ok(new CalendarName({ value: calendarNameString }));
  }

  private constructor(props: CalendarNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
