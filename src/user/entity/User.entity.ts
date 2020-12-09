import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'user' })
export class UserEntity {
  @Field(() => String)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @IsString()
  @MinLength(1)
  @Column()
  name: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
