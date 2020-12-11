import { isEmpty } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  static create(userPasswordString: string): Result<UserPassword> {
    const MIN_LENGTH = 6;

    if (isEmpty(userPasswordString)) {
      return Result.fail('UserPasswordString should not be empty.');
    }

    if (userPasswordString.length < MIN_LENGTH) {
      return Result.fail(
        `UserPasswordString should be longer than ${MIN_LENGTH}`,
      );
    }

    return Result.ok(new UserPassword({ value: userPasswordString }));
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
