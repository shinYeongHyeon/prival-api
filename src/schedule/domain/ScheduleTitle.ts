import { isEmpty } from 'lodash';

import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

interface ScheduleTitleProps {
  value: string;
}

export class ScheduleTitle extends ValueObject<ScheduleTitleProps> {
  static create(scheduleTitleString: string): Result<ScheduleTitle> {
    if (isEmpty(scheduleTitleString)) {
      return Result.fail('scheduleTitleString should not be empty.');
    }

    return Result.ok(new ScheduleTitle({ value: scheduleTitleString }));
  }

  private constructor(props: ScheduleTitleProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
