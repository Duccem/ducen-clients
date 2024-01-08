import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from 'core';
import { CreateSessionCommand, GetLastSessionQuery } from 'hospital';

@Resolver('Payment')
export class PaymentResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Mutation('createSession')
  async createSession(@Args('guildId') guildId: string, @Args('period') period: string) {
    const command = new CreateSessionCommand(guildId, period);
    await this.commandBus.dispatch(command);
  }

  @Query('getLastSession')
  async getLastSession(@Args('guildId') guildId: string) {
    const query = new GetLastSessionQuery(guildId);
    return await this.queryBus.ask(query);
  }
}
