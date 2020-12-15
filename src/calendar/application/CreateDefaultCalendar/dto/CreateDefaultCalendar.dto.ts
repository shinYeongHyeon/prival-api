import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CalendarEntity } from '../../../entity/Calendar.entity';

export class CreateDefaultCalendarRequest extends PickType(CalendarEntity, [
  'name',
]) {
  userId: string;
}

@ObjectType()
export class CreateDefaultCalendarResponse extends CoreResponse {
  @Field(() => CalendarEntity, { nullable: true })
  calendar?: CalendarEntity;
}
