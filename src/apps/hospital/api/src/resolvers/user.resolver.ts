import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from 'core';
import { ChangePasswordCommand, LoginQuery, RecoveryPasswordCommand, UserRegisterCommand } from 'hospital';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Mutation('userRegister')
  async userRegister(@Args('user') user: any) {
    const command = new UserRegisterCommand(user);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Query('login')
  async login(@Args('identifier') identifier: string, @Args('password') password: string) {
    const query = new LoginQuery(identifier, password);
    return await this.queryBus.ask(query);
  }

  @Mutation('recoveryPassword')
  async recoveryPassword(@Args('email') email: string) {
    const command = new RecoveryPasswordCommand(email);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation('changePassword')
  async changePassword(
    @Args('memberId') memberId: string,
    @Args('newPassword') newPassword: string,
    @Args('oldPassword') oldPassword: string,
  ) {
    const command = new ChangePasswordCommand(memberId, newPassword, oldPassword);
    await this.commandBus.dispatch(command);
    return null;
  }
}
