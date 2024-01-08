import { Member } from './Member';

export interface AuthService {
  generateToken(member: Member): string;
  validateToken(token: string): boolean;
}
