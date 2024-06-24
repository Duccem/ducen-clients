import { UserRepository } from '../domain/UserRepository';

export class GetAuthToken {
  constructor(private repository: UserRepository) {}

  run() {
    return this.repository.getToken();
  }
}
