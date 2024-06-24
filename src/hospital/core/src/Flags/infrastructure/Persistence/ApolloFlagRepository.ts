import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { ApolloRepository } from '@ducen/shared';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class ApolloFlagRepository extends ApolloRepository<Flag> implements FlagRepository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client, Flag);
  }
  async getFlags(): Promise<any[]> {
    const result = await this.client.query({
      query: gql(`
        query getFlags {
          getFlags {
            name
            enabled
          }
        }`),
    });
    return result.data.getFlags;
  }
}
