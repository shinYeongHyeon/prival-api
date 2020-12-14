import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/AuthUser.decorator';
import { CreateDefaultCalendarUseCase } from '../application/CreateDefaultCalendar/CreateDefaultCalendarUseCase';
import { CreateDefaultCalendarResponse } from '../application/CreateDefaultCalendar/dto/CreateDefaultCalendar.dto';
import { Calendar } from '../domain/Calendar';
import { UserEntity } from '../../user/entity/User.entity';

@Resolver(() => Calendar)
export class CalendarResolver {
  constructor(
    private readonly createDefaultCalendarUseCase: CreateDefaultCalendarUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CreateDefaultCalendarResponse)
  async createDefaultCalendar(
    @AuthUser() authUser: UserEntity,
  ): Promise<CreateDefaultCalendarResponse> {
    return await this.createDefaultCalendarUseCase.execute({
      name: authUser.name,
    });
  }
}
