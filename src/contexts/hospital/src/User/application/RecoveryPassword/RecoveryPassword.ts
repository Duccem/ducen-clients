import { UserRepository } from '../../domain/UserRepository';

export class RecoveryPassword {
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<void> {
    return await this.repository.recoveryPassword(email);
  }
}
