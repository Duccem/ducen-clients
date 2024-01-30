import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { LOGIN } from './apollo/login';
import { REGISTER } from './apollo/register';

export class ApolloUserRepository implements UserRepository {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const result = await this.client.query({
        query: LOGIN,
        variables: { identifier: email, password },
      });
      const element = result.data.login;
      return {
        user: element.user,
        token: element.token,
      };
    } catch (error) {
      console.log(error);
    }
    return { user: {} as User, token: '' };
  }

  async register(user: User): Promise<void> {
    await this.client.mutate({
      mutation: REGISTER,
      variables: { user },
    });
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation changePassword($userId: String, $newPassword: String, $oldPassword: String) {
          changePassword(userId: $userId, newPassword: $newPassword, oldPassword: $oldPassword)
        }
      `,
      variables: { userId, newPassword, oldPassword },
    });
  }

  async recoverPassword(email: string): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation recoveryPassword($email: String) {
          recoveryPassword(email: $email)
        }
      `,
      variables: { email },
    });
  }
}
