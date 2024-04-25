import { Primitives } from '@ducen-clients/shared';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class CreateUser {
  constructor(private repository: UserRepository) {}

  async run(user: Primitives<User>, password: string): Promise<void> {
    const newUser = User.create(
      user.id,
      user.name,
      user.email,
      password,
      user.role,
      user.birthDate,
      user.address,
      user.phoneNumber,
      user.gender,
      user.photo,
      user.configuration
    );
    await this.repository.create(newUser, newUser.getPassword());
  }
}
