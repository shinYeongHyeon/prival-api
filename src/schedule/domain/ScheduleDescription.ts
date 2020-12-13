import { isNil } from 'lodash';

import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

interface ScheduleDescriptionProps {
  value: string;
}

export class ScheduleDescription extends ValueObject<ScheduleDescriptionProps> {
  static create(
    scheduleDescriptionString: string,
  ): Result<ScheduleDescription> {
    if (isNil(scheduleDescriptionString)) {
      return Result.fail('scheduleDescriptionString should not be undefined.');
    }

    return Result.ok(new ScheduleDescription({ value: scheduleDescriptionString }));
  }

  private constructor(props: ScheduleDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
