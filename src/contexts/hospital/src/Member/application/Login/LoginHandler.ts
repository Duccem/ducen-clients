import { Query, QueryHandler } from 'core';
import { AuthService } from '../../domain/AuthService';
import { MemberNotExist } from '../../domain/MemberNotExist';
import { MemberRepository } from '../../domain/MemberRepository';
import { LoginQuery } from './LoginQuery';

export class LoginHandler implements QueryHandler<LoginQuery> {
  constructor(
    private userRepository: MemberRepository,
    private authService: AuthService,
  ) {}
  subscribedTo(): Query {
    return LoginQuery;
  }

  async handle(query: LoginQuery): Promise<any> {
    const member = await this.userRepository.identify(query.identifier);
    if (!member) throw new MemberNotExist();

    member.validatePassword(query.password);

    return {
      token: this.authService.generateToken(member),
      member: member.toPrimitives(),
    };
  }
}
