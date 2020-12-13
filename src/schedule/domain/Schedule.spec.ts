import { Result } from '../../shared/core/Result';
import { ScheduleDateTime } from './ScheduleDateTime';
import { ScheduleTitle } from './ScheduleTitle';
import { ScheduleDescription } from './ScheduleDescription';
import { Schedule } from './Schedule';

describe('Schedule', () => {
  const START = new Date(2020, 2, 10, 14, 0, 0);
  const END = new Date();
  const TITLE = '달력1';
  const DESCRIPTION = '설명';
  const ONLY_DATE = false;

  let scheduleOrError: Result<Schedule>;
  let scheduleTitle: ScheduleTitle;
  let scheduleDescription: ScheduleDescription;
  let scheduleStart: ScheduleDateTime;
  let scheduleEnd: ScheduleDateTime;

  beforeEach(() => {
    scheduleTitle = ScheduleTitle.create(TITLE).value;
    scheduleDescription = ScheduleDescription.create(DESCRIPTION).value;
    scheduleStart = ScheduleDateTime.create(START).value;
    scheduleEnd = ScheduleDateTime.create(END).value;

    scheduleOrError = Schedule.createNew({
      title: scheduleTitle,
      description: scheduleDescription,
      onlyDate: ONLY_DATE,
      start: scheduleStart,
      end: scheduleEnd,
    });
  });

  it('생성되었는지', () => {
    expect(scheduleOrError.isSuccess).toBe(true);
  });

  it('end 는 무조건 start 보다 커야 한다.', () => {
    const scheduleError = Schedule.createNew({
      title: scheduleTitle,
      description: scheduleDescription,
      onlyDate: ONLY_DATE,
      start: scheduleEnd,
      end: scheduleStart,
    });

    expect(scheduleError.isSuccess).toBe(false);
    expect(scheduleError.errorValue()).toEqual(
      'end must be bigger than start.',
    );
  });

  it('getter 들이 정상작동하는지', () => {
    const start = scheduleOrError.value.start.value;
    const end = scheduleOrError.value.end.value;
    const createdAt = scheduleOrError.value.createdAt;
    const now = new Date();

    expect(scheduleOrError.value.title).toEqual(scheduleTitle);
    expect(scheduleOrError.value.title.value).toEqual(TITLE);
    expect(scheduleOrError.value.description).toEqual(scheduleDescription);
    expect(scheduleOrError.value.description.value).toEqual(DESCRIPTION);
    expect(
      `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`,
    ).toEqual(`${START.getFullYear()}-${START.getMonth()}-${START.getDate()}`);
    expect(`${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`).toEqual(
      `${END.getFullYear()}-${END.getMonth()}-${END.getDate()}`,
    );
    expect(
      `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`,
    ).toEqual(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
    expect(scheduleOrError.value.onlyDate).toEqual(ONLY_DATE);
  });
});
