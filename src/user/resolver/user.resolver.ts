import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Boolean)
export class UserResolver {
  @Query(() => Boolean)
  healthCheck(): boolean {
    return true;
  }
}
