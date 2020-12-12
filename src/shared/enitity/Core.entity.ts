import { IsString } from 'class-validator';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreEntity {
  @Field(() => String)
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
