import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UserEntity } from '../../../entity/User.entity';

@InputType()
export class CreateUserRequest extends PickType(UserEntity, ['name']) {}

@ObjectType()
export class CreateUserResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
