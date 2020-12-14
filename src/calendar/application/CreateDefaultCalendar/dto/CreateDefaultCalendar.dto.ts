import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CalendarEntity } from '../../../entity/Calendar.entity';

@InputType()
export class CreateDefaultCalendarRequest extends PickType(CalendarEntity, [
  'name',
]) {}

@ObjectType()
export class CreateDefaultCalendarResponse extends CoreResponse {
  @Field(() => CalendarEntity, { nullable: true })
  calendar?: CalendarEntity;
}
