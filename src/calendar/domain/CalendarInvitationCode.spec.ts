import { Result } from '../../shared/core/Result';
import { CalendarInvitationCode } from './CalendarInvitationCode';

describe('CalendarInvitationCode', () => {
  const INVITATION_CODE_CAN_BE_EMPTY = '';
  const INVITATION_CODE_NOT_ALLOW_NULL_OR_UNDEFINED =
    'Invitation Code should to Defined.';

  let calendarInvitationCodeOrError: Result<CalendarInvitationCode>;

  it('생성되었는지', () => {
    calendarInvitationCodeOrError = CalendarInvitationCode.create(
      INVITATION_CODE_CAN_BE_EMPTY,
    );

    expect(calendarInvitationCodeOrError.isSuccess).toBe(true);
    expect(calendarInvitationCodeOrError.value.value).toEqual(
      INVITATION_CODE_CAN_BE_EMPTY,
    );
  });

  it('null | undefined 는 에러가 나는지', () => {
    calendarInvitationCodeOrError = CalendarInvitationCode.create(null);
    const calendarInvitationCodeOrErrorOfUndefined = CalendarInvitationCode.create(
      undefined,
    );

    expect(calendarInvitationCodeOrError.isSuccess).toBe(false);
    expect(calendarInvitationCodeOrErrorOfUndefined.isSuccess).toBe(false);
    expect(calendarInvitationCodeOrError.errorValue()).toEqual(
      INVITATION_CODE_NOT_ALLOW_NULL_OR_UNDEFINED,
    );
    expect(calendarInvitationCodeOrErrorOfUndefined.errorValue()).toEqual(
      INVITATION_CODE_NOT_ALLOW_NULL_OR_UNDEFINED,
    );
  });
});
