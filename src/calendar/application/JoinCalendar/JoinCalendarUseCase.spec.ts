import { mock, MockProxy } from 'jest-mock-extended';

import { IUsersCalendarRepository } from '../../infra/interface/IUsersCalendarRepository';
import { UserRole } from '../../entity/UsersCalendar.entity';
import { JoinCalendarUseCase } from './JoinCalendarUseCase';

describe('JoinCalendarUseCase', () => {
  const USER_ID = 'user_id';
  const CALENDAR_ID = 'calendar_id';
  const USER_ROLE = UserRole.CREATOR;

  let uut: JoinCalendarUseCase;
  let usersCalendarRepository: MockProxy<IUsersCalendarRepository>;

  beforeAll(() => {
    usersCalendarRepository = mock<IUsersCalendarRepository>();
    uut = new JoinCalendarUseCase(usersCalendarRepository);
  });

  function givenSaveThrowError() {
    usersCalendarRepository.save.mockRejectedValue(new Error());
  }

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('정상적으로 생성하는지', async () => {
    const joinedResponse = await uut.execute({
      calendarId: CALENDAR_ID,
      userId: USER_ID,
      userRole: USER_ROLE,
    });

    expect(joinedResponse.ok).toBe(true);
  });

  it('에러를 정상적으로 뱉어내는지', async () => {
    givenSaveThrowError();

    const joinedResponse = await uut.execute({
      calendarId: CALENDAR_ID,
      userId: USER_ID,
      userRole: USER_ROLE,
    });

    expect(joinedResponse.ok).toBe(false);
  });
});
