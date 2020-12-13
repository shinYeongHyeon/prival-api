import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalendarEntity } from './entity/Calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
})
export class CalendarModule {}
