import { IUsersCalendarRepository } from './interface/IUsersCalendarRepository';
import { InMemoryUsersCalendarRepository } from './InMemoryUsersCalendarRepository';
import { UsersCalendar } from '../domain/UsersCalendar';
import { UserRole } from '../entity/UsersCalendar.entity';

describe('InMemoryUsersCalendarRepository', () => {
  const USER_ID = 'user_id';
  const CALENDAR_ID = 'calendar_id';
  const USER_ROLE = UserRole.CREATOR;

  let uut: IUsersCalendarRepository;
  let createdUsersCalendar: UsersCalendar;

  beforeAll(() => {
    uut = new InMemoryUsersCalendarRepository();
    createdUsersCalendar = UsersCalendar.createNew({
      userId: USER_ID,
      calendarId: CALENDAR_ID,
      userRole: USER_ROLE,
    }).value;
  });

  describe('save', () => {
    it('저장이 잘 되는지', async () => {
      const savedUsersCalendar = await uut.save(createdUsersCalendar);

      expect(createdUsersCalendar.isEqual(savedUsersCalendar)).toBe(true);
    });
  });
});
