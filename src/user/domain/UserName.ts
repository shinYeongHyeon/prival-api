import { isEmpty } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  static create(userNameString: string): Result<UserName> {
    if (isEmpty(userNameString)) {
      return Result.fail('UserName should not be empty.');
    }

    return Result.ok(new UserName({ value: userNameString }));
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
