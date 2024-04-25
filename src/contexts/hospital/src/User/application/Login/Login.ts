import { Nullable } from '@ducen-clients/shared';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class Login {
  constructor(private repository: UserRepository) {}

  async run(username: string, password: string): Promise<Nullable<{ token: string; user: User }>> {
    return await this.repository.login(username, password);
  }
}
