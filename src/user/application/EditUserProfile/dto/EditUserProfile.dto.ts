import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UserEntity } from '../../../entity/User.entity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export class EditUserProfileRequestDto extends PickType(UserEntity, [
  'id',
  'name',
  'password',
]) {}

@InputType()
export class EditUserProfileRequest extends PickType(UserEntity, [
  'name',
  'password',
]) {}

@ObjectType()
export class EditUserProfileResponse extends CoreResponse {}
