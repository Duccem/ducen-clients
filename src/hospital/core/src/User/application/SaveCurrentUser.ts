import { Primitives } from '@ducen/shared';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class SaveCurrentUser {
  constructor(private repository: UserRepository) {}

  run(data: { token: string; user: Primitives<User> }) {
    const user = User.fromPrimitives(data.user);
    this.repository.saveToken(data.token);
    this.repository.saveUser(user);
  }
}
