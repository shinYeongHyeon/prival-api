import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CalendarEntity } from '../../../entity/Calendar.entity';

@ObjectType()
export class CreateDefaultCalendarDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

@InputType()
export class CreateDefaultCalendarRequest extends PickType(CalendarEntity, [
  'name',
]) {}

@ObjectType()
export class CreateDefaultCalendarResponse extends CoreResponse {
  @Field(() => CreateDefaultCalendarDto, { nullable: true })
  calendar?: CreateDefaultCalendarDto;
}
