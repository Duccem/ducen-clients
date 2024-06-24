import { Primitives } from '@ducen/shared';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class LocalStorageUserRepository implements UserRepository {
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user.toPrimitives()));
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getUser(): User {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return User.fromPrimitives(user);
  }
  savePartialUser(user: Partial<Primitives<User>>): void {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...user }));
  }
}
