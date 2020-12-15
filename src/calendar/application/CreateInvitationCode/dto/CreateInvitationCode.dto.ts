import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CalendarEntity } from '../../../entity/Calendar.entity';

@InputType()
export class CreateInvitationCodeRequest extends PickType(CalendarEntity, [
  'id',
]) {}

@ObjectType()
export class CreateInvitationCodeResponse extends CoreResponse {
  @Field(() => Int, { nullable: true })
  code?: number;
}
