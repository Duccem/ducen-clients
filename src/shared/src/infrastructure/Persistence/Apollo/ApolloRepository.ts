/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Entity } from '../../../domain/Entity';
import { NewableClass } from '../../../domain/Types/NewableClass';

export class ApolloRepository<T extends Entity> {
  constructor(protected client: ApolloClient<NormalizedCacheObject>, private entity: NewableClass<T>) {}
  protected get model() {
    return this.entity.name.toLowerCase();
  }
}
