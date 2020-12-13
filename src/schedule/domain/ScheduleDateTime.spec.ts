import { Result } from '../../shared/core/Result';
import { ScheduleDateTime } from './ScheduleDateTime';

describe('ScheduleDateTime', () => {
  const SCHEDULE_DATE = new Date();
  const NIL_ERROR_MESSAGE = 'Date should be Defined';

  let scheduleDateTimeOrError: Result<ScheduleDateTime>;

  it('생성되는지', () => {
    scheduleDateTimeOrError = ScheduleDateTime.create(SCHEDULE_DATE);

    expect(scheduleDateTimeOrError.isSuccess).toBe(true);
    expect(scheduleDateTimeOrError.value.value).toEqual(SCHEDULE_DATE);
  });

  it('null | undefined 로 생성이 안 됩니다', () => {
    scheduleDateTimeOrError = ScheduleDateTime.create(null);
    const scheduleDateTimeOrErrorOfUndefined = ScheduleDateTime.create(
      undefined,
    );

    expect(scheduleDateTimeOrError.isSuccess).toBe(false);
    expect(scheduleDateTimeOrErrorOfUndefined.isSuccess).toBe(false);
    expect(scheduleDateTimeOrError.errorValue()).toEqual(NIL_ERROR_MESSAGE);
    expect(scheduleDateTimeOrErrorOfUndefined.errorValue()).toEqual(
      NIL_ERROR_MESSAGE,
    );
  });
});
