import { Result } from '../../shared/core/Result';
import { UsersCalendar } from './UsersCalendar';
import { UserRole } from '../entity/UsersCalendar.entity';

describe('UsersCalendar', () => {
  const USER_ID = 'user_id';
  const CALENDAR_ID = 'calendar_id';
  const USER_ROLE = UserRole.PARTICIPANT;

  let usersCalendarOrError: Result<UsersCalendar>;

  beforeAll(() => {
    usersCalendarOrError = UsersCalendar.createNew({
      userId: USER_ID,
      calendarId: CALENDAR_ID,
      userRole: USER_ROLE,
    });
  });

  it('잘 생성되는지', () => {
    expect(usersCalendarOrError).toBeDefined();
    expect(usersCalendarOrError.isSuccess).toBe(true);
  });

  it('getter 들이 정상작동하는지', () => {
    const createdAt = usersCalendarOrError.value.createdAt;
    const now = new Date();

    expect(usersCalendarOrError.value.userId).toEqual(USER_ID);
    expect(usersCalendarOrError.value.calendarId).toEqual(CALENDAR_ID);
    expect(usersCalendarOrError.value.userRole).toEqual(USER_ROLE);
    expect(
      `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`,
    ).toEqual(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
  });
});
