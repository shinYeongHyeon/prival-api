import { mock, MockProxy } from 'jest-mock-extended';

import { CreateScheduleUseCase } from './CreateScheduleUseCase';
import { Schedule } from '../../domain/Schedule';
import { ScheduleDateTime } from '../../domain/ScheduleDateTime';
import { ScheduleTitle } from '../../domain/ScheduleTitle';
import { ScheduleDescription } from '../../domain/ScheduleDescription';
import { IScheduleRepository } from '../../infra/interface/IScheduleRepository';

describe('CreateScheduleUseCase', () => {
  const START = new Date('2020-12-01 10:00:00');
  const END = new Date('2020-12-02 10:00:00');
  const ONLY_DATE = false;
  const TITLE = 'title';
  const DESCRIPTION = 'description';
  const CALENDAR_ID = 'calendar';
  const FAIL_MESSAGE = 'Fail to create Schedule';

  let uut: CreateScheduleUseCase;
  let scheduleRepository: MockProxy<IScheduleRepository>;

  beforeAll(() => {
    scheduleRepository = mock<IScheduleRepository>();
    uut = new CreateScheduleUseCase(scheduleRepository);
  });

  function givenCreateScheduleSaveSuccess() {
    scheduleRepository.save.mockResolvedValueOnce(
      Schedule.createNew({
        calendarId: CALENDAR_ID,
        description: ScheduleDescription.create(DESCRIPTION).value,
        end: ScheduleDateTime.create(END).value,
        onlyDate: ONLY_DATE,
        start: ScheduleDateTime.create(START).value,
        title: ScheduleTitle.create(TITLE).value,
      }).value,
    );
  }

  function givenCreateScheduleSaveFail() {
    scheduleRepository.save.mockRejectedValueOnce(new Error());
  }

  it('생성되는지', () => {
    expect(uut).toBeDefined();
  });

  it('잘 생성하는지', async () => {
    givenCreateScheduleSaveSuccess();

    const createScheduleResponse = await uut.execute({
      calendarId: CALENDAR_ID,
      description: DESCRIPTION,
      end: END,
      onlyDate: ONLY_DATE,
      start: START,
      title: TITLE,
    });

    expect(createScheduleResponse.ok).toBe(true);
    expect(createScheduleResponse.schedule.title).toEqual(TITLE);
  });

  it('생성시 실패한 경우', async () => {
    givenCreateScheduleSaveFail();

    const createScheduleResponse = await uut.execute({
      calendarId: CALENDAR_ID,
      description: DESCRIPTION,
      end: END,
      onlyDate: ONLY_DATE,
      start: START,
      title: TITLE,
    });

    expect(createScheduleResponse.ok).toBe(false);
    expect(createScheduleResponse.error).toEqual(FAIL_MESSAGE);
  });
});
