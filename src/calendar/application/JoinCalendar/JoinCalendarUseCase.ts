import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import {
  JoinCalendarRequestDto,
  JoinCalendarResponseDto,
} from './dto/JoinCalendar.dto';
import { IUsersCalendarRepository } from '../../infra/interface/IUsersCalendarRepository';
import { UsersCalendar } from '../../domain/UsersCalendar';

export class JoinCalendarUseCase
  implements IUseCase<JoinCalendarRequestDto, JoinCalendarResponseDto> {
  private FAIL_MESSAGE = 'Join Failed';

  constructor(
    @Inject('USERS_CALENDAR_REPOSITORY')
    private readonly usersCalendarRepository: IUsersCalendarRepository,
  ) {}

  async execute(
    request: JoinCalendarRequestDto,
  ): Promise<JoinCalendarResponseDto> {
    try {
      const usersCalendar = await UsersCalendar.createNew({
        userId: request.userId,
        calendarId: request.calendarId,
        userRole: request.userRole,
      }).value;

      await this.usersCalendarRepository.save(usersCalendar);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: this.FAIL_MESSAGE };
    }
  }
}
