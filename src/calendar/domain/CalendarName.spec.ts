import { Result } from '../../shared/core/Result';
import { CalendarName } from './CalendarName';

describe('CalendarName', () => {
  const CALENDAR_NAME = 'TEST_CALENDAR';
  const EMPTY_STRING_ERROR_MESSAGE = 'Calendar Name is Not Empty.';

  let calendarNameOrError: Result<CalendarName>;

  it('생성되는지', () => {
    calendarNameOrError = CalendarName.create(CALENDAR_NAME);

    expect(calendarNameOrError.isSuccess).toBe(true);
    expect(calendarNameOrError.value.value).toEqual(CALENDAR_NAME);
  });

  it('빈 값인 경우 오류가 나는지', () => {
    calendarNameOrError = CalendarName.create('');

    expect(calendarNameOrError.isSuccess).toBe(false);
    expect(calendarNameOrError.errorValue()).toEqual(
      EMPTY_STRING_ERROR_MESSAGE,
    );
  });

  it('undefined | null 인 경우 오류가 나는지', () => {
    calendarNameOrError = CalendarName.create(null);
    const CalendarNameOrErrorOfUndefined = CalendarName.create(undefined);

    expect(calendarNameOrError.isSuccess).toBe(false);
    expect(CalendarNameOrErrorOfUndefined.isSuccess).toBe(false);
    expect(calendarNameOrError.errorValue()).toEqual(
      EMPTY_STRING_ERROR_MESSAGE,
    );
    expect(CalendarNameOrErrorOfUndefined.errorValue()).toEqual(
      EMPTY_STRING_ERROR_MESSAGE,
    );
  });
});
