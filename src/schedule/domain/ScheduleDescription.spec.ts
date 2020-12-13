import { Result } from '../../shared/core/Result';
import { ScheduleDescription } from './ScheduleDescription';

describe('ScheduleDescription', () => {
  const SCHEDULE_DESCRIPTION = '';
  const NIL_ERROR_MESSAGE =
    'scheduleDescriptionString should not be undefined.';

  let scheduleDescriptionOrError: Result<ScheduleDescription>;

  it('생성되는지', () => {
    scheduleDescriptionOrError = ScheduleDescription.create(
      SCHEDULE_DESCRIPTION,
    );

    expect(scheduleDescriptionOrError.isSuccess).toBe(true);
    expect(scheduleDescriptionOrError.value.value).toEqual(
      SCHEDULE_DESCRIPTION,
    );
  });

  it('scheduleDescription String 은 null 이나 undefined 일 수 없습니다', () => {
    scheduleDescriptionOrError = ScheduleDescription.create(null);
    const scheduleDescriptionOrErrorOfUndefined = ScheduleDescription.create(
      undefined,
    );

    expect(scheduleDescriptionOrError.isSuccess).toBe(false);
    expect(scheduleDescriptionOrErrorOfUndefined.isSuccess).toBe(false);
    expect(scheduleDescriptionOrError.errorValue()).toEqual(NIL_ERROR_MESSAGE);
    expect(scheduleDescriptionOrErrorOfUndefined.errorValue()).toEqual(
      NIL_ERROR_MESSAGE,
    );
  });
});
