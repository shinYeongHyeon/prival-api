import { Result } from '../../shared/core/Result';
import { ScheduleTitle } from './ScheduleTitle';

describe('ScheduleTitle', () => {
  const SCHEDULE_TITLE = '일정1';
  const EMPTY_ERROR_MESSAGE = 'scheduleTitleString should not be empty.';

  let scheduleTitleOrError: Result<ScheduleTitle>;

  it('생성되는지', () => {
    scheduleTitleOrError = ScheduleTitle.create(SCHEDULE_TITLE);

    expect(scheduleTitleOrError.isSuccess).toBe(true);
    expect(scheduleTitleOrError.value.value).toEqual(SCHEDULE_TITLE);
  });

  it('scheduleTitle String 은 빈 값일 수 없습니다', () => {
    scheduleTitleOrError = ScheduleTitle.create('');

    expect(scheduleTitleOrError.isSuccess).toBe(false);
    expect(scheduleTitleOrError.errorValue()).toEqual(EMPTY_ERROR_MESSAGE);
  });

  it('scheduleTitle String 은 null 이나 undefined 일 수 없습니다', () => {
    scheduleTitleOrError = ScheduleTitle.create(null);
    const scheduleTitleOrErrorOfUndefined = ScheduleTitle.create(undefined);

    expect(scheduleTitleOrError.isSuccess).toBe(false);
    expect(scheduleTitleOrErrorOfUndefined.isSuccess).toBe(false);
    expect(scheduleTitleOrError.errorValue()).toEqual(EMPTY_ERROR_MESSAGE);
    expect(scheduleTitleOrErrorOfUndefined.errorValue()).toEqual(
      EMPTY_ERROR_MESSAGE,
    );
  });
});
