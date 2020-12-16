import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../auth/auth.guard';
import { CreateScheduleRequest, CreateScheduleResponse } from '../application/CreateSchedule/dto/CreateSchedule.dto';
import { CreateScheduleUseCase } from '../application/CreateSchedule/CreateScheduleUseCase';
import { Schedule } from '../domain/Schedule';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CreateScheduleResponse)
  async createSchedule(
    @Args('input') createScheduleRequest: CreateScheduleRequest,
  ) {
    return await this.createScheduleUseCase.execute(createScheduleRequest);
  }
}
