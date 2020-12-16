import { IsString } from 'class-validator';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { ScheduleEntity } from '../../../entity/Schedule.entity';

@ObjectType()
export class CreateScheduleResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;

  @Field(() => Boolean)
  onlyDate: boolean;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class CreateScheduleRequest extends PickType(ScheduleEntity, [
  'start',
  'end',
  'onlyDate',
  'title',
  'description',
]) {
  @Field(() => String)
  @IsString()
  calendarId: string;
}

@ObjectType()
export class CreateScheduleResponse extends CoreResponse {
  @Field(() => CreateScheduleResponseDto, { nullable: true })
  schedule?: CreateScheduleResponseDto;
}
