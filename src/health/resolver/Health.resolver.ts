import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Boolean)
export class HealthResolver {
  @Query(() => Boolean)
  healthCheck(): boolean {
    return true;
  }
}
