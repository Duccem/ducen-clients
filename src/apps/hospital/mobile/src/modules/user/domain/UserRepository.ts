import { User } from './User';

export interface UserRepository {
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  register(user: User): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
  recoverPassword(email: string): Promise<void>;
}
