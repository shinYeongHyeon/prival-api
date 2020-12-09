import { Module } from '@nestjs/common';

import { HealthCheckerResolver } from './resolver/HealthCheckerResolver';

@Module({
  providers: [HealthCheckerResolver],
})
export class HealthModule {}
