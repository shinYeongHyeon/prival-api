import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { CreateDefaultCalendarRequest, CreateDefaultCalendarResponse } from './dto/CreateDefaultCalendar.dto';
import { ICalendarRepository } from '../../infra/interface/ICalendarRepository';
import { CalendarName } from '../../domain/CalendarName';
import { CalendarInvitationCode } from '../../domain/CalendarInvitationCode';
import { Calendar } from '../../domain/Calendar';

export class CreateDefaultCalendarUseCase
  implements
    IUseCase<CreateDefaultCalendarRequest, CreateDefaultCalendarResponse> {
  private DEFAULT_CALENDAR_ONLY_OWN = true;
  private DEFAULT_CALENDAR_INVITATION_CODE = '';

  constructor(
    @Inject('CALENDAR_REPOSITORY')
    private readonly calendarRepository: ICalendarRepository,
  ) {}

  async execute(
    request: CreateDefaultCalendarRequest,
  ): Promise<CreateDefaultCalendarResponse> {
    const calendarName = CalendarName.create(request.name).value;
    const calendarInvitationCode = CalendarInvitationCode.create(
      this.DEFAULT_CALENDAR_INVITATION_CODE,
    ).value;

    const calendar = Calendar.createNew({
      calendarName,
      calendarOnlyOwn: this.DEFAULT_CALENDAR_ONLY_OWN,
      calendarInvitationCode,
    }).value;

    await this.calendarRepository.saveDefault(calendar);

    return {
      ok: true,
      calendar: {
        id: calendar.id.toValue().toString(),
        name: calendar.name.value,
      },
    };
  }
}
