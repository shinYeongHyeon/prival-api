import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CreateInvitationCodeRequest, CreateInvitationCodeResponse } from './dto/CreateInvitationCode.dto';
import { Calendar } from '../../domain/Calendar';
import { CalendarInvitationCode } from '../../domain/CalendarInvitationCode';
import { CalendarName } from '../../domain/CalendarName';
import { ICalendarRepository } from '../../infra/interface/ICalendarRepository';

export class CreateInvitationCodeUseCase
  implements
    IUseCase<CreateInvitationCodeRequest, CreateInvitationCodeResponse> {
  constructor(
    @Inject('CALENDAR_REPOSITORY')
    private readonly calendarRepository: ICalendarRepository,
  ) {}

  async execute(
    request: CreateInvitationCodeRequest,
  ): Promise<CreateInvitationCodeResponse> {
    const foundCalender = await this.calendarRepository.find(request.id);
    if (!foundCalender) {
      return {
        ok: false,
        error: `Can't not found Calender : ${request.id}`,
      };
    }
    const randomInvitationCode = Math.floor(
      Math.random() * (10000 - 1000) + 1000,
    );

    await this.calendarRepository.save(
      Calendar.create(
        {
          calendarInvitationCode: CalendarInvitationCode.create(
            randomInvitationCode.toString(),
          ).value,
          calendarName: CalendarName.create(foundCalender.name.value).value,
          calendarOnlyOwn: foundCalender.onlyOwn,
          createdAt: foundCalender.createdAt,
        },
        new UniqueEntityId(foundCalender.id.toValue().toString()),
      ).value,
    );

    return {
      ok: true,
      code: randomInvitationCode,
    };
  }
}
