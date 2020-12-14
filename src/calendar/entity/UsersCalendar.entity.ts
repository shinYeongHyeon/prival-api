import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from '../../shared/enitity/Core.entity';
import { CalendarEntity } from './Calendar.entity';
import { UserEntity } from '../../user/entity/User.entity';
import { IsEnum } from 'class-validator';
import { Field } from '@nestjs/graphql';

export enum UserRole {
  CREATOR = 'CREATOR',
  PARTICIPANT = 'PARTICIPANT',
}

@Entity({ name: 'usersCalendar' })
export class UsersCalendarEntity extends CoreEntity {
  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  calendar: CalendarEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARTICIPANT,
  })
  @IsEnum(UserRole)
  userRole: UserRole;
}
