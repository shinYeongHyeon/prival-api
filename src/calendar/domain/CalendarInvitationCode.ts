import { isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface CalendarInvitationCodeProps {
  value: string;
}

export class CalendarInvitationCode extends ValueObject<CalendarInvitationCodeProps> {
  static create(invitationCodeString: string): Result<CalendarInvitationCode> {
    if (isNil(invitationCodeString)) {
      return Result.fail('Invitation Code should to Defined.');
    }

    return Result.ok(
      new CalendarInvitationCode({ value: invitationCodeString }),
    );
  }

  private constructor(props: CalendarInvitationCodeProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
