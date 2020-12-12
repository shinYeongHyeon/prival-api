import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from '../../shared/enitity/Core.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'user' })
export class UserEntity extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(6)
  @Column({ select: false })
  password: string;

  @Field(() => String)
  @IsString()
  @MinLength(1)
  @Column()
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
  }
}
