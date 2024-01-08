import { Query } from 'core';

export class GetMemberMasterQuery extends Query {
  constructor(public readonly guildId: string) {
    super();
  }
}
