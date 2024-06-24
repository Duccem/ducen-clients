import { User } from './User';

export interface UserRepository {
  saveToken(token: string): void;
  saveUser(user: User): void;
  getToken(): string;
  getUser(): User;
}
