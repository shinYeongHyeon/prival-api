import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import {
  CreateScheduleRequest,
  CreateScheduleResponse,
} from './dto/CreateSchedule.dto';
import { Schedule } from '../../domain/Schedule';
import { ScheduleDateTime } from '../../domain/ScheduleDateTime';
import { ScheduleTitle } from '../../domain/ScheduleTitle';
import { ScheduleDescription } from '../../domain/ScheduleDescription';
import { IScheduleRepository } from '../../infra/interface/IScheduleRepository';

export class CreateScheduleUseCase
  implements IUseCase<CreateScheduleRequest, CreateScheduleResponse> {
  constructor(
    @Inject('SCHEDULE_REPOSITORY')
    private readonly scheduleRepository: IScheduleRepository,
  ) {}

  async execute(
    request: CreateScheduleRequest,
  ): Promise<CreateScheduleResponse> {
    try {
      const createdSchedule = Schedule.createNew({
        start: ScheduleDateTime.create(new Date(request.start)).value,
        end: ScheduleDateTime.create(new Date(request.end)).value,
        onlyDate: request.onlyDate,
        title: ScheduleTitle.create(request.title).value,
        description: ScheduleDescription.create(request.description).value,
        calendarId: request.calendarId,
      }).value;

      const savedSchedule = await this.scheduleRepository.save(createdSchedule);

      return {
        ok: true,
        schedule: {
          id: savedSchedule.id.toValue().toString(),
          start: savedSchedule.start.value,
          end: savedSchedule.end.value,
          onlyDate: savedSchedule.onlyDate,
          title: savedSchedule.title.value,
          description: savedSchedule.description.value,
        },
      };
    } catch {
      return { ok: false, error: 'Fail to create Schedule' };
    }
  }
}
