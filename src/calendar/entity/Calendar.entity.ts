import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from '../../shared/enitity/Core.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'calendar' })
export class CalendarEntity extends CoreEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean)
  @Column({
    default: false,
    comment: '기본 캘린더, 본인만 사용 가능',
  })
  onlyOwn: boolean;

  @Field(() => String)
  @Column({
    default: '',
    comment: '초대 코드, 다른 사람 초대할때 사용 가능',
  })
  invitationCode: string;
}
