import { Module } from '@nestjs/common';

import { HealthResolver } from './resolver/Health.resolver';

@Module({
  providers: [HealthResolver],
})
export class HealthModule {}
