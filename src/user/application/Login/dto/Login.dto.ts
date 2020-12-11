import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UserEntity } from '../../../entity/User.entity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

@InputType()
export class LoginRequest extends PickType(UserEntity, ['email', 'password']) {}

@ObjectType()
export class LoginResponse extends CoreResponse {
  @Field(() => String, { nullable: true })
  token?: string;
}
