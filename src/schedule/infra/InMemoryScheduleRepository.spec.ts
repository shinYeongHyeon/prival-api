import { Schedule } from '../domain/Schedule';
import { ScheduleDescription } from '../domain/ScheduleDescription';
import { ScheduleDateTime } from '../domain/ScheduleDateTime';
import { ScheduleTitle } from '../domain/ScheduleTitle';
import { InMemoryScheduleRepository } from './InMemoryScheduleRepository';

describe('InMemoryScheduleRepository', () => {
  const CALENDAR_ID = 'calendar';
  const DESCRIPTION = 'description';
  const TITLE = 'title';
  const START = new Date('2020-12-01 10:00:00');
  const END = new Date('2020-12-02 11:00:00');
  const ONLY_DATE = false;

  let uut: InMemoryScheduleRepository;

  beforeAll(() => {
    uut = new InMemoryScheduleRepository();
  });

  it('생성되는지', () => {
    expect(uut).toBeDefined();
  });

  describe('저장 잘 되는지', () => {
    it('저장이 잘 되는지', async () => {
      const createdSchedule = Schedule.createNew({
        end: ScheduleDateTime.create(END).value,
        start: ScheduleDateTime.create(START).value,
        onlyDate: ONLY_DATE,
        title: ScheduleTitle.create(TITLE).value,
        description: ScheduleDescription.create(DESCRIPTION).value,
        calendarId: CALENDAR_ID,
      }).value;

      const savedSchedule = await uut.save(createdSchedule);

      expect(createdSchedule.isEqual(savedSchedule)).toBe(true);
    });
  });
});
