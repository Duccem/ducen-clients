import { Query } from 'core';

export class GetGuildInformationQuery extends Query {
  guildId: string;
  constructor(guildId: string) {
    super();
    this.guildId = guildId;
  }
}
