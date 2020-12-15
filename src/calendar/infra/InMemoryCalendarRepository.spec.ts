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
  let calendarId: string;

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
    calendarId = createdCalendar.id.toValue().toString();
  });

  describe('save', () => {
    it('저장이 잘 되는지', async () => {
      const savedCalendar = await uut.save(createdCalendar);

      expect(createdCalendar.isEqual(savedCalendar)).toBe(true);
    });
  });

  describe('find', () => {
    it('잘 찾아지는지', async () => {
      const foundCalendar = await uut.find(calendarId);

      expect(foundCalendar).toBeDefined();
      expect(foundCalendar.name.value).toEqual(CALENDAR_NAME);
    });
  });
});
