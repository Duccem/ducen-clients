import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { ApolloRepository, Nullable, Uuid } from '@ducen-clients/shared';
import { User } from '../../../domain/User';
import { UserPassword } from '../../../domain/UserPassword';
import { UserRepository } from '../../../domain/UserRepository';
import { LOGIN } from './login';
import { REGISTER } from './register';

export class ApolloUserRepository extends ApolloRepository<User> implements UserRepository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client, User);
  }
  async create(user: User, password: UserPassword): Promise<void> {
    await this.client.mutate({
      mutation: REGISTER,
      variables: {
        user: {
          ...user.toPrimitives(),
          password: password.getValue(),
        },
      },
    });
  }
  async login(username: string, password: string): Promise<Nullable<{ token: string; user: User }>> {
    const result = await this.client.query({
      query: LOGIN,
      variables: { identifier: username, password },
    });
    const element = result.data.login;
    return {
      user: User.fromPrimitives(element.user),
      token: element.token,
    };
  }

  async recoveryPassword(email: string): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation recoveryPassword($email: String) {
          recoveryPassword(email: $email)
        }
      `,
      variables: { email },
    });
  }

  async changePassword(userId: Uuid, newPassword: string, oldPassword: string): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation changePassword($userId: String, $newPassword: String, $oldPassword: String) {
          changePassword(userId: $userId, newPassword: $newPassword, oldPassword: $oldPassword)
        }
      `,
      variables: { userId, newPassword, oldPassword },
    });
  }
}
