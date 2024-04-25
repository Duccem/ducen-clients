import { Uuid } from '@ducen-clients/shared';
import { UserRepository } from '../../domain/UserRepository';

export class ChangePassword {
  constructor(private repository: UserRepository) {}

  async run(userId: string, password: string, oldPassword: string): Promise<void> {
    return await this.repository.changePassword(new Uuid(userId), password, oldPassword);
  }
}
