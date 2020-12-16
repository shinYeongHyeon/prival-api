import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from '../../shared/enitity/Core.entity';
import { CalendarEntity } from '../../calendar/entity/Calendar.entity';
import { IsBoolean, isString, IsString } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'schedule' })
export class ScheduleEntity extends CoreEntity {
  @Field(() => String)
  @IsString()
  @Column()
  start: Date;

  @Field(() => String)
  @IsString()
  @Column()
  end: Date;

  @Field(() => Boolean)
  @IsBoolean()
  @Column({
    default: false,
  })
  onlyDate: boolean;

  @Field(() => String)
  @IsString()
  @Column()
  title: string;

  @Field(() => String)
  @IsString()
  @Column({
    default: '',
    length: 300,
  })
  description: string;

  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  calendar: CalendarEntity;
}
