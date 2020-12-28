import { mock, MockProxy } from 'jest-mock-extended';

import { CreateDefaultCalendarUseCase } from './CreateDefaultCalendarUseCase';
import { UsersCalendar } from '../../domain/UsersCalendar';
import { UserRole } from '../../entity/UsersCalendar.entity';
import { ICalendarRepository } from '../../infra/interface/ICalendarRepository';
import { IUsersCalendarRepository } from '../../infra/interface/IUsersCalendarRepository';

describe('CreateDefaultCalendarUseCase', () => {
  const USER_ID = 'user_id';
  const CALENDAR_NAME = '유저이름';
  const CALENDAR_ID = 'calendar_id';

  let uut: CreateDefaultCalendarUseCase;
  let calendarRepository: MockProxy<ICalendarRepository>;
  let usersCalendarRepository: MockProxy<IUsersCalendarRepository>;

  beforeAll(() => {
    calendarRepository = mock<ICalendarRepository>();
    usersCalendarRepository = mock<IUsersCalendarRepository>();
    uut = new CreateDefaultCalendarUseCase(
      calendarRepository,
      usersCalendarRepository,
    );
  });

  async function createCalendar(userId: string, name: string) {
    return await uut.execute({
      userId,
      name,
    });
  }

  function givenFindDefaultByUserIdReturnCalendar() {
    usersCalendarRepository.findDefaultByUserId
      .calledWith(USER_ID)
      .mockResolvedValue(
        UsersCalendar.createNew({
          calendarId: CALENDAR_ID,
          userId: USER_ID,
          userRole: UserRole.CREATOR,
        }).value,
      );
  }

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('캘린더 Create', async () => {
    const createDefaultCalendarUseCaseResponse = await createCalendar(
      USER_ID,
      CALENDAR_NAME,
    );

    expect(createDefaultCalendarUseCaseResponse).toBeDefined();
    expect(createDefaultCalendarUseCaseResponse.ok).toBe(true);
    expect(createDefaultCalendarUseCaseResponse.calendar.name).toEqual(
      CALENDAR_NAME,
    );
  });

  it('캘린더 Create', async () => {
    givenFindDefaultByUserIdReturnCalendar();
    const createDefaultCalendarUseCaseResponse = await createCalendar(
      USER_ID,
      CALENDAR_NAME,
    );

    expect(createDefaultCalendarUseCaseResponse).toBeDefined();
    expect(createDefaultCalendarUseCaseResponse.ok).toBe(false);
  });
});
