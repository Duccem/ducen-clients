import { Primitives } from '@ducen/shared';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { AuthActions, UserState } from '../UserStore';

export class StoreUserRepository implements UserRepository {
  constructor(
    private dispatch: React.Dispatch<AuthActions>,
    private state: UserState,
  ) {}
  saveToken(token: string): void {
    this.dispatch({ type: 'set_token', payload: token });
  }
  saveUser(user: User): void {
    this.dispatch({ type: 'set_user', payload: user.toPrimitives() });
  }
  getToken(): string {
    return this.state.token;
  }
  getUser(): User {
    return User.fromPrimitives(this.state.user);
  }
  savePartialUser(user: Partial<Primitives<User>>): void {
    this.dispatch({ type: 'set_partial_user', payload: user });
  }
}
