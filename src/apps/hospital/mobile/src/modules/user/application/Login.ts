import { UserRepository } from '../domain/UserRepository';

export class Login {
  constructor(private readonly repository: UserRepository) {}

  async run(email: string, password: string) {
    return await this.repository.login(email, password);
  }
}
