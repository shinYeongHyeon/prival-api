import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from '../../shared/enitity/Core.entity';
import { CalendarEntity } from './Calendar.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'schedule' })
export class ScheduleEntity extends CoreEntity {
  @Field(() => Date)
  @Column()
  start: Date;

  @Field(() => Date)
  @Column()
  end: Date;

  @Field(() => Boolean)
  @Column({
    default: false,
  })
  onlyDate: boolean;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column({
    default: '',
    length: 300,
  })
  description: string;

  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  calendar: CalendarEntity;
}
