import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UserEntity } from '../../../entity/User.entity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

@ObjectType()
export class FindUserDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}

@InputType()
export class FindUserRequest extends PickType(UserEntity, ['id']) {}

@ObjectType()
export class FindUserResponse extends CoreResponse {
  @Field(() => FindUserDto, { nullable: true })
  user?: FindUserDto;
}
