import { UserRepository } from '../domain/UserRepository';

export class GetCurrentUser {
  constructor(private repository: UserRepository) {}

  run() {
    return this.repository.getUser();
  }
}
