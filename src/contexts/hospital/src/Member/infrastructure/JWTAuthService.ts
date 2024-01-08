import jwt from 'jsonwebtoken';
import { AuthService } from '../domain/AuthService';
import { Member } from '../domain/Member';

export class JWTAuthService implements AuthService {
  constructor(private readonly secretKey: string) {}
  generateToken(member: Member): string {
    const payload = member.generateToken();
    const token = jwt.sign(payload, this.secretKey, { expiresIn: 60 * 60 * 24 });
    return token;
  }
  validateToken(token: string): any {
    const payload = jwt.verify(token, this.secretKey);
    return payload;
  }
}
