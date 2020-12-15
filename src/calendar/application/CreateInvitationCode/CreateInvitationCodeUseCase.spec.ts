import { mock, MockProxy } from 'jest-mock-extended';

import { CreateInvitationCodeUseCase } from './CreateInvitationCodeUseCase';
import { Calendar } from '../../domain/Calendar';
import { CalendarInvitationCode } from '../../domain/CalendarInvitationCode';
import { CalendarName } from '../../domain/CalendarName';
import { ICalendarRepository } from '../../infra/interface/ICalendarRepository';



describe('CreateInvitationCodeUseCase', () => {
  const CALENDAR_ID = 'calendar_id';

  let uut: CreateInvitationCodeUseCase;
  let calendarRepository: MockProxy<ICalendarRepository>;

  beforeEach(() => {
    calendarRepository = mock<ICalendarRepository>();
    uut = new CreateInvitationCodeUseCase(calendarRepository);
  });

  function givenCalendarOfCalendarId() {
    calendarRepository.find.calledWith(CALENDAR_ID).mockResolvedValue(
      Calendar.createNew({
        calendarInvitationCode: CalendarInvitationCode.create('').value,
        calendarName: CalendarName.create('TEST').value,
        calendarOnlyOwn: false,
      }).value,
    );
  }

  it('생성되는지', () => {
    expect(uut).toBeDefined();
  });

  it('잘 생성되는지', async () => {
    givenCalendarOfCalendarId();

    const createInvitationCodeResponse = await uut.execute({
      id: CALENDAR_ID,
    });

    expect(createInvitationCodeResponse.ok).toBe(true);
    expect(createInvitationCodeResponse.code).toBeGreaterThanOrEqual(1000);
    expect(createInvitationCodeResponse.code).toBeLessThan(10000);
  });

  it('잘 못 찾을 경우 오류', async () => {
    givenCalendarOfCalendarId();

    const createInvitationCodeResponse = await uut.execute({
      id: 'wrongId',
    });

    expect(createInvitationCodeResponse.ok).toBe(false);
    expect(createInvitationCodeResponse.error).toEqual(
      `Can't not found Calender : wrongId`,
    );
  });
});
