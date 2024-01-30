import { User } from './User';

export interface UserService {
  login(username: string, password: string): Promise<{ user: User; token: string }>;
  create(user: User): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  changePassword(memberId: string, newPassword: string, oldPassword: string): Promise<void>;
}
