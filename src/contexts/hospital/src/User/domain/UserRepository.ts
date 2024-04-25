import { Uuid } from '@ducen-clients/shared';
import { User } from './User';
import { UserPassword } from './UserPassword';

export interface UserRepository {
  login(username: string, password: string): Promise<{ user: User; token: string }>;
  create(user: User, password: UserPassword): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  changePassword(userId: Uuid, newPassword: string, oldPassword: string): Promise<void>;
}
