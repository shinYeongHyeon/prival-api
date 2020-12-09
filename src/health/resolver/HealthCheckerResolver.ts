import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Boolean)
export class HealthCheckerResolver {
  @Query(() => Boolean)
  healthCheck(): boolean {
    return true;
  }
}
