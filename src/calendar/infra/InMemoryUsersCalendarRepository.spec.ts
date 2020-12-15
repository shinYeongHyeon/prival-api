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

  describe('findByUserId', () => {
    it('잘 찾아지는지', async () => {
      const foundUser = await uut.findDefaultByUserId(USER_ID);

      expect(foundUser).toBeDefined();
      expect(foundUser.calendarId).toEqual(CALENDAR_ID);
      expect(foundUser.userRole).toEqual(USER_ROLE);
    });

    it('없는 유저는 못찾는지', async () => {
      const foundUser = await uut.findDefaultByUserId('wrongId');

      expect(foundUser).toBeUndefined();
    });

    it('유저캘린더는 있지만, 디폴트가 없는 경우에는 못찾는지', async () => {
      const participantUser = 'anotherUser';
      await uut.save(
        UsersCalendar.createNew({
          userId: participantUser,
          calendarId: CALENDAR_ID,
          userRole: UserRole.PARTICIPANT,
        }).value,
      );
      const foundUser = await uut.findDefaultByUserId(participantUser);

      expect(foundUser).toBeUndefined();
    });
  });
});
