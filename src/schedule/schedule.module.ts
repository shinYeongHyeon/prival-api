import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleEntity } from './entity/Schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
})
export class ScheduleModule {}
