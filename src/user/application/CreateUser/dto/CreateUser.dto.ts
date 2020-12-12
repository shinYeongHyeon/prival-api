import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
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
export class CreateUserResponse extends CoreResponse {
  @Field(() => CreateUserDto, { nullable: true })
  user?: CreateUserDto;
}
