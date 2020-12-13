import { Result } from '../../shared/core/Result';
import { CalendarName } from './CalendarName';
import { CalendarInvitationCode } from './CalendarInvitationCode';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  const NAME = '기본캘린더';
  const INVITATION_CODE = 'WELCOME';
  const IS_ONLY_OWN = true;

  let calendarOrError: Result<Calendar>;
  let calendarName: CalendarName;
  let calendarInvitationCode: CalendarInvitationCode;

  beforeEach(() => {
    calendarName = CalendarName.create(NAME).value;
    calendarInvitationCode = CalendarInvitationCode.create(INVITATION_CODE)
      .value;

    calendarOrError = Calendar.createNew({
      calendarName,
      calendarOnlyOwn: IS_ONLY_OWN,
      calendarInvitationCode,
    });
  });

  it('생성되었는지', () => {
    expect(calendarOrError.isSuccess).toBe(true);
  });

  it('getter 들이 정상작동하는지', () => {
    const calendar = calendarOrError.value;
    const createdAt = calendar.createdAt;
    const now = new Date();

    expect(calendar.name).toEqual(calendarName);
    expect(calendar.name.value).toEqual(NAME);
    expect(calendar.onlyOwn).toBe(IS_ONLY_OWN);
    expect(calendar.invitationCode).toEqual(calendarInvitationCode);
    expect(calendar.invitationCode.value).toEqual(INVITATION_CODE);
    expect(
      `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`,
    ).toEqual(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
  });
});
