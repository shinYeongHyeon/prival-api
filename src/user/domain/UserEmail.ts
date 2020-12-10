import { isEmpty } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  static create(userEmailString: string): Result<UserEmail> {
    if (isEmpty(userEmailString)) {
      return Result.fail('userEmailString should not be empty.');
    }

    return Result.ok(new UserEmail({ value: userEmailString }));
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
