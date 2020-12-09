import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'user' })
export class UserEntity {
  @Field(() => String)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updateAt: Date;
}
