import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UserEntity } from '../../../entity/User.entity';

@ObjectType()
export class CreateUserDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}

@InputType()
export class CreateUserRequest extends PickType(UserEntity, [
  'email',
  'password',
  'name',
]) {}

@ObjectType()
export class CreateUserResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => CreateUserDto)
  user: CreateUserDto;
}
