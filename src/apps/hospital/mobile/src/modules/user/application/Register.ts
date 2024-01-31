import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class Register {
  constructor(private readonly repository: UserRepository) {}

  async run(user: User) {
    return await this.repository.register(user);
  }
}
