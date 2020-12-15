import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/AuthUser.decorator';
import { CreateDefaultCalendarUseCase } from '../application/CreateDefaultCalendar/CreateDefaultCalendarUseCase';
import { CreateDefaultCalendarResponse } from '../application/CreateDefaultCalendar/dto/CreateDefaultCalendar.dto';
import { JoinCalendarUseCase } from '../application/JoinCalendar/JoinCalendarUseCase';
import { Calendar } from '../domain/Calendar';
import { UserRole } from '../entity/UsersCalendar.entity';
import { UserEntity } from '../../user/entity/User.entity';
import {
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse,
} from '../application/CreateInvitationCode/dto/CreateInvitationCode.dto';
import { CreateInvitationCodeUseCase } from '../application/CreateInvitationCode/CreateInvitationCodeUseCase';

@Resolver(() => Calendar)
export class CalendarResolver {
  constructor(
    private readonly createDefaultCalendarUseCase: CreateDefaultCalendarUseCase,
    private readonly joinCalendarUseCase: JoinCalendarUseCase,
    private readonly createInvitationCodeUseCase: CreateInvitationCodeUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CreateDefaultCalendarResponse)
  async createDefaultCalendar(
    @AuthUser() authUser: UserEntity,
  ): Promise<CreateDefaultCalendarResponse> {
    const userId = authUser.id;
    const createDefaultCalendarUseCaseResponse = await this.createDefaultCalendarUseCase.execute(
      {
        userId,
        name: authUser.name,
      },
    );

    if (createDefaultCalendarUseCaseResponse.ok) {
      const calendarId = createDefaultCalendarUseCaseResponse.calendar.id;

      await this.joinCalendarUseCase.execute({
        calendarId,
        userId,
        userRole: UserRole.CREATOR,
      });
    }

    return createDefaultCalendarUseCaseResponse;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CreateInvitationCodeResponse)
  async createInvitationCode(
    @Args('input') createInvitationCodeRequest: CreateInvitationCodeRequest,
  ) {
    return this.createInvitationCodeUseCase.execute(
      createInvitationCodeRequest,
    );
  }
}
