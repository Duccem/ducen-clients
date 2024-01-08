import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { ApolloRepository, Uuid } from 'core';
import { Payment } from '../domain/Payment';
import { PaymentService } from '../domain/PaymentService';

export class ApolloPaymentService extends ApolloRepository<Payment> implements PaymentService {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client, Payment);
  }

  async createSession(guildId: Uuid, period: string): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation createSession($guildId: String, $period: String) {
          createSession(guildId: $guildId, period: $period)
        }
      `,
      variables: {
        guildId: guildId.value,
        period,
      },
    });
  }

  async getLastSession(guildId: Uuid): Promise<Payment> {
    const { data } = await this.client.query({
      query: gql`
        query getLastSession($guildId: String!) {
          getLastSession(guildId: $guildId) {
            id
            sessionId
            guildId
            priceId
            createdAt
            updatedAt
            paymentDate
            status
            url
          }
        }
      `,
      variables: {
        guildId: guildId.value,
      },
    });

    return new Payment(data.getLastSession);
  }
}
