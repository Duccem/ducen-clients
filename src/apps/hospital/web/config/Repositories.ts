import { ApolloGuildService, ApolloMemberService, ApolloPaymentService } from 'hospital';
import { getClient } from './ApolloClient';
import { Configurations } from './Configurations';

export const getServices = (conf: Configurations) => {
  const client = getClient(conf.baseUrl);
  const guildService = new ApolloGuildService(client);
  const memberService = new ApolloMemberService(client);
  const paymentService = new ApolloPaymentService(client);

  return { guildService, memberService, paymentService };
};
