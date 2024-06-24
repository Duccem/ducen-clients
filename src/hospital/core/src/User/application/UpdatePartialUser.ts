import { Primitives } from '@ducen/shared';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UpdatePartialUser {
  constructor(private userRepository: UserRepository) {}

  async run(data: Partial<Primitives<User>>) {
    this.userRepository.savePartialUser(data);
  }
}
