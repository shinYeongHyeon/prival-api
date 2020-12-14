import { mock, MockProxy } from 'jest-mock-extended';

import { ICalendarRepository } from '../../infra/interface/ICalendarRepository';
import { CreateDefaultCalendarUseCase } from './CreateDefaultCalendarUseCase';

describe('CreateDefaultCalendarUseCaseSpec', () => {
  const CALENDAR_NAME = '유저이름';

  let uut: CreateDefaultCalendarUseCase;
  let calendarRepository: MockProxy<ICalendarRepository>;

  beforeAll(() => {
    calendarRepository = mock<ICalendarRepository>();
    uut = new CreateDefaultCalendarUseCase(calendarRepository);
  });

  async function createCalendar(name: string) {
    return await uut.execute({
      name: name,
    });
  }

  it('생성되었는지', () => {
    expect(uut).toBeDefined();
  });

  it('캘린더 Create', async () => {
    const createDefaultCalendarUseCaseResponse = await createCalendar(
      CALENDAR_NAME,
    );

    expect(createDefaultCalendarUseCaseResponse).toBeDefined();
    expect(createDefaultCalendarUseCaseResponse.ok).toBe(true);
    expect(createDefaultCalendarUseCaseResponse.calendar.name).toEqual(
      CALENDAR_NAME,
    );
  });
});
