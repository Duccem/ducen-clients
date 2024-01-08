import { Query } from 'core';

export class GetLastSessionQuery extends Query {
  constructor(public readonly guildId: string) {
    super();
  }
}
