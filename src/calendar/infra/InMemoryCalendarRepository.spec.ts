import { ICalendarRepository } from './interface/ICalendarRepository';
import { Calendar } from '../domain/Calendar';
import { CalendarName } from '../domain/CalendarName';
import { CalendarInvitationCode } from '../domain/CalendarInvitationCode';
import { InMemoryCalendarRepository } from './InMemoryCalendar.repository';

describe('InMemoryCalendarRepository', () => {
  const CALENDAR_NAME = '유저이름';
  const ONLY_OWN = true;
  const INVITATION_CODE = '';

  let uut: ICalendarRepository;
  let createdCalendar: Calendar;

  beforeAll(() => {
    uut = new InMemoryCalendarRepository();

    const calendarName = CalendarName.create(CALENDAR_NAME).value;
    const calendarInvitationCode = CalendarInvitationCode.create(
      INVITATION_CODE,
    ).value;
    createdCalendar = Calendar.createNew({
      calendarName,
      calendarOnlyOwn: ONLY_OWN,
      calendarInvitationCode,
    }).value;
  });

  describe('saveDefault', () => {
    it('저장이 잘 되는지', async () => {
      const savedCalendar = await uut.saveDefault(createdCalendar);

      expect(createdCalendar.isEqual(savedCalendar)).toBe(true);
    });
  });
});
